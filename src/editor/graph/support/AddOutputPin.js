import './AddOutputPin.scss';
import TextField from '../gadgets/TextField';
import PlusIcon from '@/assets/plus.svg';
import {svgElement} from '@/utils/utils'
import EventEmitter from '@/utils/EventEmitter';

export default class extends EventEmitter
{
  constructor() {
    super();

    this.element = document.createElement('div');
    this.element.className = 'add-output-pin-container'

    this.pin = document.createElement('div');
    this.pin.className = 'add-output-pin';
    this.element.appendChild(this.pin)

    this.textField = new TextField(null, '...');
    this.pin.appendChild(this.textField.element);

    this.head = document.createElement('div');
    this.head.className = 'add-output-head';
    this.pin.appendChild(this.head);

    let svg = svgElement(PlusIcon, {className: 'plus-svg', width:13, height:13})
    this.head.appendChild(svg);

    // FIXME: move this into corresponding block...
    this.head.addEventListener('mousedown', e => {
      e.preventDefault();
      
      let outputName = String.trim(this.textField.value);
      if(outputName) {
        this.emit('addPin.trigger', outputName);
        this.textField.value = '';
      }
    })

    this.head.addEventListener
  }

  focus() {
    this.textField.focus();
  }
}