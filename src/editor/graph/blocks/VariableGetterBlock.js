import Block from "./Block";
import OutputPin from "../support/OutputPin";

export default class GetterBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    // GetterNode actually use variable id as the name by default
    this.outputPin = this.outputPins.get('output');

    // change the output pin's name from id to actual name
    this.outputPin.label.textContent = node.variableName;
    // also listening on name changes from the variable
    node.variable.on('variable.name.changed', this.onNameChanged, this)
  }

  destroy() {
    super.destroy();
    this.node.variable.off('variable.name.changed', this.onNameChanged, this)
  }

  onNameChanged(data) {
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

    let variable = ActivityManager.activity.lookUp.get(pod.variableID);
    let pin = new OutputPin(variable.name);
    pin.symbol.colorize(variable.type)
    this.body.addRight(pin);
  }
}