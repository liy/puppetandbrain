import './PuppetBox.scss';
import GridBox from './GridBox';
import { svgElement } from '@/utils/utils';

import Logo from '@/assets/logo.svg';

export default class extends GridBox
{
  constructor(pod) {
    super();
    this.element.classList.add('block-box');

    let block = BlockFactory.createTemplateBlock(pod);
    block.template(pod);
    this.element.appendChild(block.element);

    block.element.addEventListener('click', e => {
      this.emit('browser.close', {
        ...pod,
        x: e.clientX,
        y: e.clientY
      });
    })
  }
}