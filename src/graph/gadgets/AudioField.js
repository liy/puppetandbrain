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
  }
}