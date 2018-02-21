import BaseElement from './BaseElement';
import TextField from '../gadgets/TextField';
import ElementController from './ElementController';

export default class extends BaseElement
{
  constructor(variable, icon) {
    super(icon);

    this.variable = variable;
    this.type = this.variable.type;

    this.nameField = new TextField(this.variable.name, 'name...');
    this.nameField.element.classList.add('element-name-field');
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

  get deletable() {
    return true;
  }
}