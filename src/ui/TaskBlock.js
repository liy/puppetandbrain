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
    this.elm.style = `min-height:${minHeight}px; min-width:${minWidth}px; padding-bottom:5px; background:rgba(242, 245,251, 0.7); position:absolute; border-radius:10px; font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;`;    

    this.inPin = null;
    this.outPins = Object.create(null);
    this.inputPins = Object.create(null);
    this.outputPins = Object.create(null);
 
    this.title = document.createElement('div');
    this.title.style = 'user-select:none; cursor:default; background:rgba(192, 196, 206, 0.85); border-radius:10px 10px 0 0; padding:5px 10px;'
    this.elm.appendChild(this.title);
    let title = this.model.__proto__.constructor.name;
    if(title == 'Call') {
      title += ' ' + this.model.function.name
    }
    else if(title == 'Function') {
      title += ' ' + this.model.name;
    }
    this.title.textContent = title;

    // TODO: clean up!!!
    if(this.model.execution) {
      this.execSection = document.createElement('div')
      this.execSection.style = `height:20px`;
      this.elm.appendChild(this.execSection);

      // always have a in execpt function
      if(this.model.__proto__.constructor.name != 'Function') {
        let execIn = new ExecutionInPin();
        this.execSection.appendChild(execIn.dom)
        this.inPin = execIn;
      }

      for(let name of this.model.execution.nameList) {
        let out = new ExecutionOutPin(name, 'right');
        this.execSection.appendChild(out.dom)
        this.outPins[name] = out;
      }
    }

    this.content = document.createElement('div')
    this.content.style = 'margin-left:5px; margin-right:5px; margin-top:5px;'
    this.elm.appendChild(this.content);

    // add pin
    if(this.model.inputs) {
      this.model.inputs.list.forEach(name => {
        let pin = new InputPin(name);
        this.content.appendChild(pin.dom);
        this.inputPins[name] = pin;
      })
    }

    if(this.model.outputs) {
      this.model.outputs.list.forEach(name => {
        let pin = new OutputPin(name);
        this.content.appendChild(pin.dom);
        this.outputPins[name] = pin;
      })
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