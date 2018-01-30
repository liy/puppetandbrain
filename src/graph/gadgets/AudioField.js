import './AudioField.scss'

import Gadget from './Gadget'
import FileButton from '../gadgets/FileButton'
import CircleProgress from '../gadgets/CircleProgress'

export default class extends Gadget
{
  constructor() {
    super();
    this.element.classList.add('audio-field');

    this.audio = null;

    this.button = new FileButton('audio/*');
    this.element.appendChild(this.button.element);

    this.circleProgress = new CircleProgress();
    this.element.appendChild(this.circleProgress.element);

    this.button.on('file.begin', () => {
      if(this.audio) this.audio.unload();
    })

    this.button.on('file.progress', progress => {
      this.circleProgress.update(progress);
    })

    this.button.on('file.ready',  async result => {
      this.circleProgress.enabled = true;

      let blob = new Blob([result.data], {type: result.contentType});
      this.audio = new Howl({
        src: [URL.createObjectURL(blob)],
        format: [result.ext]
      });
    })

    this.circleProgress.on('click',() => {
      if(this.audio && this.audio.playing()) {
        this.audio.stop();
      }
      else {
        this.audio.play();
      }
    })
  }
}