import './AudioField.scss'

import Gadget from './Gadget'
import FileButton from '../gadgets/FileButton'
import CircleProgress from '../gadgets/CircleProgress'

export default class extends Gadget
{
  constructor() {
    super();
    this.element.classList.add('audio-field');

    this.button = new FileButton('audio/*');
    this.element.appendChild(this.button.element);

    this.circleProgress = new CircleProgress();
    this.element.appendChild(this.circleProgress.element);

    this.button.on('file.progress', progress => {
      this.circleProgress.update(progress);
    })

    this.button.on('file.ready', () => {
      this.circleProgress.enabled = true;
    })
  }
}