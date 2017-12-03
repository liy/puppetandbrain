import DataBlock from "./DataBlock";
import OutputPin from "../OutputPin";

export default class GetterBlock extends DataBlock
{
  constructor(node) {
    super(node);

    this.content.classList.add('getter-block');

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