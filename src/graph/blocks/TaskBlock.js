import ExecutionInPin from "../ExecutionInPin";
import ExecutionOutPin from "../ExecutionOutPin";
import InputPin from "../InputPin";
import OutputPin from "../OutputPin";
import Block from "./Block";
import ArrayMap from "../../utils/ArrayMap";

// FIXME: clean up the UI!!!


export default class TaskBlock extends Block
{
  constructor(node) {
    super(node)

    let minWidth = 200;
    let minHeight = 60;

    this.container.style = `min-height:${minHeight}px; min-width:${minWidth}px; `;

    this.inPin = null;
    this.outPins = new ArrayMap();

    this.title = document.createElement('div');
    this.title.className = 'title'
    this.container.appendChild(this.title);
    let title = this.node.nodeName;
    if(title == 'Perform') {
      this.container.className += ' perform-block'
      title = this.node.target.name + ' Perform '  + this.node.actionName
    }
    else if(title == 'Action') {
      this.container.className += ' action-block'
      title += ' ' + this.node.actionName;
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
    if(this.node.__proto__.constructor.name != 'Action') {
      this.inPin = new ExecutionInPin();
      row(0).appendChild(this.inPin.container);
    }

    // out pins
    for(let i=0; i<this.node.execution.names.length; ++i) {
      let name = this.node.execution.names[i]
      let out = new ExecutionOutPin(name);
      row(i).appendChild(out.container)
      this.outPins.set(name, out);
    }

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let poiner = this.node.inputs.get(name);
      let pin = new InputPin(name)
      row(i+1).appendChild(pin.container);
      this.inputPins.set(name, pin);

      if(poiner.isLocalPointer) {
        let inputField = document.createElement('input');
        inputField.value = poiner.value;
        pin.inputField = inputField;
        pin.container.appendChild(inputField)
        inputField.addEventListener('change', (e) => {
          this.node.initialState.variables[name] = this.node.variables[name] = e.target.value
        })
      }
    }

    for(let i=0; i<this.node.outputs.names.length; ++i) {
      let name = this.node.outputs.names[i];
      let pin = new OutputPin(name, name);
      row(this.node.execution.names.length + i).appendChild(pin.container);
      this.outputPins.set(name, pin);
    }
  }

  dragmove(e) {
    super.dragmove(e);

    // executuion pins
    for(let pin of this.outPins.getValues()) {
      pin.drawConnection();
    }
    if(this.inPin) this.inPin.drawConnection();

    // output input pins
    for(let pin of this.inputPins.getValues()) {
      pin.drawConnection();
    }
    for(let pin of this.outputPins.getValues()){
      pin.drawConnection();
    }
  }
}