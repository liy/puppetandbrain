import './MapEntry.scss'

import EventEmitter from "../../utils/EventEmitter";
import InputField from './InputField';

import CrossIcon from '../../assets/cross.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends EventEmitter
{
  constructor(map, key, value) {
    super();
    
    this.type = DataType.MAP;

    this.map = map;
    this.key = key;

    this.element = document.createElement('li');

    this.keyField = new InputField();
    this.keyField.element.classList.add('key-field');
    this.keyField.placeholder = 'key';
    this.keyField.value = key;
    this.element.appendChild(this.keyField.element);

    this.valueField = new InputField();
    this.valueField.element.classList.add('entry-value-field');
    this.valueField.placeholder = 'value';
    this.valueField.value = value;
    this.element.appendChild(this.valueField.element);

    // cross remove icon
    this.icon = document.createElement('div');
    this.element.appendChild(this.icon);
    this.icon.className = 'remove-entry-icon';
    this.icon.appendChild(svgElement(CrossIcon, {width:10, height:10}));

    this.onValueChange = this.onValueChange.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);

    this.icon.addEventListener('mousedown', e => {
      this.emit('entry.remove', this);
    })

    this.valueField.input.addEventListener('change', this.onValueChange)
    this.keyField.input.addEventListener('change', this.onKeyChange)
  }

  focus() {
    this.valueField.focus();
  }

  onValueChange(e) {
    this.map.set(this.key, e.target.value);
    this.value = e.target.value;
  }

  onKeyChange(e) {
    let newKey = e.target.value;
    if(!this.map.contains(newKey)) {
      let value = this.map.get(this.key);
      this.map.remove(this.key);
      this.map.set(newKey, value);
      this.key = newKey;
    }
    else {
      // TODO: show error
    }
  }
}