import './Entry.scss';
import InputField from '../gadgets/InputField';

import CrossIcon from '@/assets/cross.svg';
import { svgElement } from '@/utils/utils';
import EventEmitter from '@/utils/EventEmitter';

export default class extends EventEmitter
{
  constructor(arr, index, value) {
    super();

    this.arr = arr;

    this.element = document.createElement('li');

    this.indexSpan = document.createElement('span');
    this.indexSpan.className = 'index-span';
    this.element.appendChild(this.indexSpan);

    this.valueField = new InputField();
    this.valueField.element.classList.add('entry-value-field');
    this.valueField.value = value;
    this.element.appendChild(this.valueField.element);

    // cross remove icon
    this.icon = document.createElement('div');
    this.element.appendChild(this.icon);
    this.icon.className = 'remove-entry-icon';
    this.icon.appendChild(svgElement(CrossIcon, {width:10, height:10}));

    this.icon.addEventListener('mousedown', e => {
      this.emit('entry.remove', this);
    })
    this.valueField.on('gadget.state.change', this.onChange, this)

    this.index = index;
  }

  destroy() {
    this.removeAllListeners();
    this.valueField.off('gadget.state.change', this.onChange, this)
    this.valueField.destroy();
  }

  onChange(value) {
    this.arr[this.index] = value;
  }

  focus() {
    this.valueField.focus();
  }

  set index(i) {
    this._index = i;
    this.indexSpan.textContent = i;
  }

  get index() {
    return this._index;
  }
}