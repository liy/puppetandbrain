import './PuppetBox.scss';
import GridBox from './GridBox';
import { svgElement } from '../utils/utils';

import Logo from '../assets/logo.svg';

export default class extends GridBox
{
  constructor(template) {
    super();
    this.element.classList.add('block-box');

    let block = BlockFactory.createTemplateBlock(template);
    block.template(template);
    this.element.appendChild(block.element);
  }
}