import Block from "./Block";

export default class GetterBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    // GetterNode actually use variable id as the name by default
    this.outputPin = this.outputPins.get(node.variable.id);

    // change the output pin's name from id to actual name
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
    this.outputPin.label.textContent = data.name;
  }
}