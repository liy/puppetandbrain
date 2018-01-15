import './KeyNameCatcher.scss'
import TextField from './TextField';

export default class extends TextField
{
  constructor(keyName) {
    super(keyName, 'Press any key...');

    this.element.classList.add('key-name-catcher');

    this.keyName = this.value = keyName;

    this.input.addEventListener('blur', e => {
      this.value = this.keyName;
    })

    this.input.addEventListener('mousedown', e => {
      this.value = '';
    })

    this.input.addEventListener('keydown', e => {
      e.preventDefault();
      e.stopPropagation();

      this.keyName = this.value = e.code;
      this.emit('gadget.state.change', this.value)
    })
  }
}