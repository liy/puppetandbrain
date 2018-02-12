import './InputModal.scss';
import Modal from "./Modal";
import TextField from '../graph/gadgets/TextField'

export default class InputModal extends Modal
{
  static exportMyPuppet(name) {
    let modal = new InputModal(name, 'Please enter the name of the puppet. So you can find it later in <b>My Puppets</b> when adding a new puppet.');
    return modal.open();
  }

  constructor(name, description) {
    super();

    this.element.classList.add('input-modal');

    this.title.textContent = 'My Puppet Name';

    this.textField = new TextField(name, 'puppet name...');
    this.content.appendChild(this.textField.element);
    this.textField.focus();

    this.description = document.createElement('span');
    this.description.className = 'input-description';
    this.description.innerHTML = description;
    this.content.appendChild(this.description);
  }

  focus() {
    this.textField.focus()
  }

  get data() {
    return this.textField.value;
  }
}