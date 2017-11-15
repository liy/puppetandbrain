import ExecutionInPin from "./ExecutionInPin";
import ExecutionOutPin from "./ExecutionOutPin";
import InputPin from "./InputPin";
import OutputPin from "./OutputPin";
import Block from "./Block";

// FIXME: clean up the UI!!!


export default class TaskBlock extends Block
{
  constructor(model) {
    super(model)

    let minWidth = 200;
    let minHeight = 60;

    this.container.style = `min-height:${minHeight}px; min-width:${minWidth}px; `;    

    this.inPin = null;
    this.outPins = Object.create(null);
    this.inputPins = Object.create(null);
    this.outputPins = Object.create(null);
 
    this.title = document.createElement('div');
    this.title.className = 'title'
    this.container.appendChild(this.title);
    let title = this.model.__proto__.constructor.name;
    if(title == 'Call') {
      this.container.className += ' call-block'
      title += ' Function ' + this.model.variables.functionName
    }
    else if(title == 'Function') {
      this.container.className += ' function-block'
      title += ' ' + this.model.variables.functionName;
    }
    this.title.textContent = title;

    this.content = document.createElement('div');
    this.container.appendChild(this.content);

    let rows = [];
    let row = (i) => {
      if(!rows[i]) {
        rows[i] = document.createElement('div');
        rows[i].className = 'row';
        this.content.appendChild(rows[i]);
      }
      return rows[i]
    }

    // task always have at least 2 pair of exeuctions, in and out
    if(this.model.__proto__.constructor.name != 'Function') {
      this.inPin = new ExecutionInPin();
      row(0).appendChild(this.inPin.container);
    }
    // out pins
    for(let i=0; i<this.model.execution.nameList.length; ++i) {
      let name = this.model.execution.nameList[i]
      let out = new ExecutionOutPin(name);
      row(i).appendChild(out.container)
      this.outPins[name] = out;
    }

    for(let i=0; i<this.model.inputs.list.length; ++i) {
      let name = this.model.inputs.list[i];
      let pin = new InputPin(this.model.inputs.get(name), name)
      row(i+1).appendChild(pin.container);
      this.inputPins[name] = pin;
    }

    for(let i=0; i<this.model.outputs.list.length; ++i) {
      let name = this.model.outputs.list[i];
      let pin = new OutputPin(name, name);
      row(this.model.execution.nameList.length + i).appendChild(pin.container);
      this.outputPins[name] = pin;
    }
  }

  dragmove(e) {
    super.dragmove(e);

    Object.keys(this.outPins).forEach(name => {
      let pin = this.outPins[name]
      pin.drawConnection();
    })
    if(this.inPin) this.inPin.drawConnection();

    // update draw input and output pins
    Object.keys(this.inputPins).forEach(name => {
      let pin = this.inputPins[name]
      pin.drawConnection();
    })
    Object.keys(this.outputPins).forEach(name => {
      let pin = this.outputPins[name]
      pin.drawConnection();
    })
  }
}