import './NameField.scss'
import InputField from './InputField';

export default class extends InputField
{
  constructor(v, p='name') {
    super(v, p);

    this.element.classList.add('name-field');
  }
}