import BaseElement from './BaseElement';
import NameField from './NameField';
import ElementController from './ElementController';

export default class extends BaseElement
{
  constructor(variable) {
    super();

    this.variable = variable;
    this.type = this.variable.type;

    this.nameField = new NameField(this.variable.name);
    this.content.appendChild(this.nameField.element);
    
    this.nameField.on('gadget.state.change', this.onNameChange, this);
  }

  destroy() {
    this.nameField.off('gadget.state.change', this.onNameChange, this);
    this.nameField.destroy();
    super.destroy();
  }

  onNameChange(name) {
    this.variable.name = name;
  }

  focus() {
    this.nameField.focus();
  }

  get name() {
    return this.nameField.value;
  }
}