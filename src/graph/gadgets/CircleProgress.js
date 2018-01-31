import './CircleProgress.scss'
import Gadget from "./Gadget";
//   <circle id="circle-progress" cx="13" cy="13" r="12" fill="none" stroke="#FF9900" stroke-width="2" stroke-dasharray="75.36" stroke-dashoffset="30"/>

const STROKE_DASHARRY = 75.36;

export default class extends Gadget
{
  constructor(type) {
    super();

    this.element.classList.add('circle-progress');

    // TODO: append play button
    this.progress = new DOMParser().parseFromString(require('!raw-loader!../../assets/circle-progress.svg'), "image/svg+xml").rootElement;
    this.element.appendChild(this.progress)
    
    this.playPath = this.progress.querySelector("#play")
    this.recordPath = this.progress.querySelector("#record")
    this.corePath = this.progress.querySelector("#core")

    this.indictor = document.createElementNS('http://www.w3.org/2000/svg','circle');
    this.indictor.setAttribute('id', 'circle-indicator');
    this.indictor.setAttribute('cx', 13);
    this.indictor.setAttribute('cy', 13);
    this.indictor.setAttribute('r', 12);
    this.indictor.setAttribute('stroke-width', 2);
    this.indictor.setAttribute('stroke-dasharray', STROKE_DASHARRY);
    this.indictor.setAttribute('stroke-dashoffset', 0);
    this.indictor.setAttribute('stroke', '#29ABE2');
    this.indictor.setAttribute('fill', 'none');
    this.progress.appendChild(this.indictor);


    this.recordPath.style.display = this.playPath.style.display = 'none'
    if(type == 'record') {
      this.recordPath.style.display = 'block'
    }
    else {
      this.playPath.style.display = 'block'
    }
    this.progress = 0;
    this.direction = 1;

    this.enabled = false;

    this.element.addEventListener('click', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      
      if(this.enabled) this.emit('click');
    })
  }

  tween(progress) {
    TweenLite.to(this, 0.5, {progress:progress, ease:Quad.easeIn, onUpdate: () => {
      let ratio = Math.abs(this.direction-this.progress);
      this.indictor.setAttribute('stroke-dashoffset', STROKE_DASHARRY*ratio);
    }});
  }

  update(progress) {
    this.progress = progress;
    let ratio = Math.abs(this.direction-this.progress);
    this.indictor.setAttribute('stroke-dashoffset', STROKE_DASHARRY*ratio);
  }

  set enabled(f) {
    this._enabled = f;
    this.playPath.style.opacity = this.recordPath.style.opacity = this.corePath.style.opacity = this._enabled ? 1: 0.6;
    this.element.style.pointerEvents = this._enabled ? 'inherit' : 'none';
  }

  get enabled() {
    return this._enabled;
  }

  set progressColor(color) {
    this.indictor.setAttribute('stroke', `#${color.toString(16)}`);
  }
}