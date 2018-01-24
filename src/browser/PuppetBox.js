import './PuppetBox.scss';
import GridBox from './GridBox';
import { svgElement } from '../utils/utils';

import Logo from '../assets/logo.svg';

export default class extends GridBox
{
  constructor() {
    super();
    this.element.classList.add('puppet-box');

    this.box = document.createElement('div');
    this.box.className = 'box'
    this.element.appendChild(this.box);

    this.title = document.createElement('span');
    this.title.className = 'title';
    this.title.textContent = 'test'
    this.element.appendChild(this.title);

    this.box.appendChild(svgElement(Logo));
  }
}