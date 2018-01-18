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
    
    this.onNameChange = this.onNameChange.bind(this);
    this.nameField.on('gadget.state.change', this.onNameChange);
  }

  onNameChange(name) {
    this.variable.name = name;
  }

  focus() {
    this.nameField.focus();
  }
}