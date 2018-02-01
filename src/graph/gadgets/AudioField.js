import './AudioField.scss'

import Gadget from './Gadget'
import FileButton from '../gadgets/FileButton'
import CircleProgress from '../gadgets/CircleProgress'
import { Resource } from '../../resources/Resource';
import SoundLoader from '../../resources/SoundLoader';

export default class extends Gadget
{
  constructor({fileName, path, contentType, ext, hash}) {
    super();
    this.element.classList.add('audio-field');

    this.button = new FileButton('audio/*', fileName);
    this.element.appendChild(this.button.element);

    this.circleProgress = new CircleProgress();
    this.element.appendChild(this.circleProgress.element);

    this.audio = new Audio();
    if(path) {
      SoundLoader.fetch(path).then(blob => {
        this.audio.src = URL.createObjectURL(blob);
        this.circleProgress.enabled = true;
      });
    }

    this.audio.addEventListener('timeupdate', () => {
      let ratio = this.audio.currentTime/this.audio.duration;
      this.circleProgress.tween(ratio);
    })

    this.audio.addEventListener('ended', () => {
      this.circleProgress.tween(0);
    })

    this.audio.addEventListener('pause', () => {
      this.circleProgress.progressColor = 0x29ABE2;
      this.circleProgress.tween(0);
    })

    this.button.on('file.begin', () => {
      this.circleProgress.direction = 1;
      this.circleProgress.progressColor = 0x29ABE2;
      if(this.audio) this.audio.pause();
    })

    this.button.on('file.progress', progress => {
      this.circleProgress.tween(progress);
    })

    this.button.on('file.ready',  async ({byteArray, ...other}) => {
      this.circleProgress.enabled = true;

      let blob = new Blob([byteArray], {type: other.contentType});

      // Update the resource with audio data so other variable,
      // node, input can read from it.
      Resource.set(other.path, blob);
      
      // let url = await API.getUrl(result.path);
      this.audio.src = URL.createObjectURL(blob);

      // Note that I've removed data bytearray from the file upload result
      this.emit('gadget.state.change', other)
    })

    this.circleProgress.on('click',() => {
      if(this.audio && !this.audio.paused) {
        this.audio.currentTime = 0;
        this.audio.pause();
      }
      else {
        this.audio.currentTime = 0;
        this.audio.play();
      }

      this.circleProgress.direction = 0;
      this.circleProgress.progressColor = 0xFF9900;
    })
  }
}