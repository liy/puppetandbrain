import Block from "./Block";
import AInputPin from "../support/AInputPin";
import AOutputPin from "../support/AOutputPin";
import AExecutionInPin from "../support/AExecutionInPin";
import AExecutionOutPin from "../support/AExecutionOutPin";

export default class SetterBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    // actually use variable id as the name by default
    this.inputPin = this.inputPins.get(node.variableID);
    this.outputPin = this.outputPins.get(node.variableID);
    
    // change the pin's name from id to actual name
    this.inputPin.label.textContent = node.variableName;
    this.outputPin.label.textContent = node.variableName;

    // also listening on name changes from the variable
    this.onNameChanged = this.onNameChanged.bind(this);
    node.variable.on('variable.name.changed', this.onNameChanged)
  }

  destroy() {
    super.destroy();
    this.node.variable.off('variable.name.changed', this.onNameChanged)
  }

  onNameChanged(data) {
    this.inputPin.label.textContent = data.name;
    this.outputPin.label.textContent = data.name;
  }

  template(pod) {
    if(pod.elementClass) {
      for(let className of pod.elementClass) {
        this.element.classList.add(className);
      }
    }

    this.title.textContent = pod.name;

    let pin = null;
    if(pod.execution) {
      if(pod.enter.enabled) {
        this.inPin = new AExecutionInPin();
        // this.inPin.init(null);
        this.body.addLeft(this.inPin);
      }

      for(let execPod of pod.execution) {
        pin = new AExecutionOutPin(execPod.name);
        // pin.init(null);
        this.body.addRight(pin);
      }
    }

    pin = new AInputPin(LookUp.get(pod.variableID).name);
    this.body.addLeft(pin);

    pin = new AOutputPin(LookUp.get(pod.variableID).name);
    this.body.addRight(pin);

    this.element.style.position = 'relative'

    this.body.element.addEventListener('mousedown', e => {
      console.log(e)
      this.emit('block.chosen', pod);
    }, {capture:true});
    // this.body.element.addEventListener('touchstart', e => {
    //   this.emit('block.chosen', pod);
    // }, {capture:true});
  }
}