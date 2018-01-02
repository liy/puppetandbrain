import Block from "./Block";

export default class SetterBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    // actually use variable id as the name by default
    this.inputPin = this.inputPins.get(node.variable.id);
    this.outputPin = this.outputPins.get(node.variable.id);
    
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
}