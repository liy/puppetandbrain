import './TutorialBanner.scss';
import { svgElement } from '../utils/utils';
import HandIcon from '../assets/hand-pointer.svg';

export default class 
{
  constructor(overlay) {
    this.overlay = overlay;

    this.element = document.createElement('div');
    this.element.className = 'tutorial-banner-container'
    document.body.appendChild(this.element);


    this.banner = document.createElement('div');
    this.banner.id = 'tutorial-banner';
    this.element.appendChild(this.banner);

    this.bannerText = document.createElement('span');
    this.bannerText.className = 'banner-span'
    this.banner.appendChild(this.bannerText);

    this.handIcon = svgElement(HandIcon, {width:42, height:32});
    this.banner.appendChild(this.handIcon);

    this.infoMode = true;

    this.onClick = this.onClick.bind(this)
    this._clicks = 0;
    this.steps = [];

    this.next = this.next.bind(this);

    this.banner.addEventListener('mousedown', this.onClick);
  }

  destroy() {
    this.element.parentElement.removeChild(this.element);
  }

  info(text, isHtml=false) {
    this.overlay.hide();

    this.fadeIn();
    this.infoMode = true;
    if(isHtml) {
      this.html = text;
    }
    else {
      this.text = text;
    }
  }

  push(text, isHtml=false) {
    this.steps.push(() => {
      this.infoMode = false;
      if(isHtml) {
        this.html = text;
      }
      else {
        this.text = text;
      }
    })
    return this;
  }

  onClick(e) {
    if(this.infoMode) {
      if(++this._clicks%3 == 0) {
        this.text = "Stop clicking me, click the button!!😤";
      }
    }
    else {
      this.next();
    }
  }

  start() {
    return new Promise(resolve => {
      this.fadeIn();
      this.next();

      this.resolve = resolve;
    });
  }

  fadeOut() {
    this.banner.style.opacity = 0;
    this.steps = [];
  }

  fadeIn() {
    this.banner.style.opacity = 1;
  }

  next() {
    this.overlay.show();
    let step = this.steps.shift();
    if(step) {
      step.call();
    }
    else {
      this.fadeOut();
      this.resolve();
    }
  }

  set text(text) {
    this.bannerText.textContent = text;
  }

  set html(html) {
    this.bannerText.innerHTML = html;
  }

  set infoMode(flag) {
    this._infoMode = flag;
    if(flag) {
      this.handIcon.style.display = 'none';
    }
    else {
      this.handIcon.style.display = 'inherit';
    }
  }

  get infoMode() {
    return this._infoMode
  }
}