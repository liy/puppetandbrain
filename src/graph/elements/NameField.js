import './NameField.scss'
import TextField from '../gadgets/TextField';

export default class extends TextField
{
  constructor(v, p='name...') {
    super(v, p);

    this.element.classList.add('name-field');
  }
}