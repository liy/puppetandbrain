import Block from "./Block";
import InputPin from "../support/InputPin";
import OutputPin from "../support/OutputPin";
import ExecutionInPin from "../support/ExecutionInPin";
import ExecutionOutPin from "../support/ExecutionOutPin";

export default class SetterBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    // the input and output name are fixed.
    this.inputPin = this.inputPins.get('input');
    this.outputPin = this.outputPins.get('output');
    
    // change the pin's name to actual variable name
    this.inputPin.label.textContent = node.variableName;
    this.outputPin.label.textContent = node.variableName;

    // also listening on name changes from the variable
    node.variable.on('variable.name.changed', this.onNameChanged, this);
  }

  destroy() {
    super.destroy();
    this.node.variable.off('variable.name.changed', this.onNameChanged, this)
  }

  onNameChanged(data) {
    this.inputPin.label.textContent = data.name;
    this.outputPin.label.textContent = data.name;
    this.title.textContent = this.node.nodeName;
  }

  template(pod) {
    this.element.classList.add('template-block');
    
    if(pod.elementClass) {
      for(let className of pod.elementClass) {
        this.element.classList.add(className);
      }
    }

    this.title.textContent = pod.name;

    let pin = null;
    if(pod.execution) {
      if(pod.enter.enabled) {
        this.inPin = new ExecutionInPin();
        // this.inPin.init(null);
        this.body.addLeft(this.inPin);
      }

      for(let execPod of pod.execution) {
        pin = new ExecutionOutPin(execPod.name);
        // pin.init(null);
        this.body.addRight(pin);
      }
    }

    let variable = ActivityManager.activity.lookUp.get(pod.variableID);

    pin = new InputPin(variable.name);
    pin.symbol.colorize(variable.descriptor.type)
    this.body.addLeft(pin);

    pin = new OutputPin(variable.name);
    pin.symbol.colorize(variable.type)
    this.body.addRight(pin);
  }
}