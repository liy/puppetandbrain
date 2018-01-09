import './ListEntry.scss';
import InputField from './InputField';

import CrossIcon from '../../assets/cross.svg';
import { svgElement } from '../../utils/utils';

export default class 
{
  constructor(index, value) {
    this.element = document.createElement('li');

    this.indexSpan = document.createElement('span');
    this.indexSpan.className = 'index-span';
    this.indexSpan.textContent = index;
    this.element.appendChild(this.indexSpan);

    this.valueField = new InputField();
    this.valueField.element.classList.add('value-field');
    this.valueField.value = value;
    this.element.appendChild(this.valueField.element);

    // cross remove icon
    this.icon = document.createElement('div');
    this.element.appendChild(this.icon);
    this.icon.className = 'remove-entry-icon';
    this.icon.appendChild(svgElement(CrossIcon, {width:10, height:10}));
  }

  focus() {
    this.valueField.focus();
  }
}