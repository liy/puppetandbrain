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
      clearInterval(intervalID);
      this.circleProgress.direction = 1;
      this.circleProgress.progressColor = 0x29ABE2;
      if(this.audio) this.audio.unload();
    })

    this.button.on('file.progress', progress => {
      this.circleProgress.tween(progress);
    })

    this.button.on('file.ready',  async result => {
      this.circleProgress.enabled = true;

      let blob = new Blob([result.data], {type: result.contentType});
      // let url = await API.getUrl(result.path);
      this.audio = new Howl({
        src: [URL.createObjectURL(blob)],
        // src: [url],
        format: [result.ext]
      });
    })

    let intervalID = null;
    this.circleProgress.on('click',() => {
      if(this.audio && this.audio.playing()) {
        this.audio.stop();
      }
      else {
        this.sound = this.audio.play();
      }

      this.circleProgress.direction = 0;
      this.circleProgress.progressColor = 0xFF9900;
      clearInterval(intervalID);
      intervalID = setInterval(() => {
        let ratio = this.audio.seek()/this.audio.duration();
        this.circleProgress.update(ratio);
      }, 200)

      this.audio.on('end', () => {
        clearInterval(intervalID);
        this.circleProgress.tween(0);
      })

      this.audio.on('stop', () => {
        this.circleProgress.progressColor = 0x29ABE2;
        clearInterval(intervalID);
        this.circleProgress.tween(0);
      })
    })
  }
}