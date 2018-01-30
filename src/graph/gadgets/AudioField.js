import './AudioField.scss'

import Gadget from './Gadget'
import FileButton from '../gadgets/FileButton'

export default class extends Gadget
{
  constructor() {
    super();
    this.element.classList.add('audio-field');

    this.button = new FileButton('audio/*');
    this.element.appendChild(this.button.element);

    // TODO: append play button
    this.circleProgress = new DOMParser().parseFromString(require('!raw-loader!../../assets/audio-element-control.svg'), "image/svg+xml").rootElement;
    this.element.appendChild(this.circleProgress)
  }
}