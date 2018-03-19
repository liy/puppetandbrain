import './TutorialBanner.scss';
import { svgElement } from '@/utils/utils';
import HandIcon from '@/assets/hand-pointer.svg';
import SoundEffect from '@/SoundEffect';

export default class 
{
  constructor(overlay) {
    this.overlay = overlay;

    this.element = document.createElement('div');
    this.element.className = 'tutorial-banner-container'
    document.body.appendChild(this.element);

    this.banner = document.createElement('div');
    this.banner.id = 'tutorial-banner';
    this.banner.style.opacity = 0;
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

    this.onBrowserClose = this.onBrowserClose.bind(this)
    this.onBrowserOpen = this.onBrowserOpen.bind(this)
    document.addEventListener('browser.opened', this.onBrowserOpen)
    document.addEventListener('browser.closed', this.onBrowserClose)
  }

  destroy() {
    this.element.parentElement.removeChild(this.element);
    document.removeEventListener('browser.opened', this.onBrowserOpen)
    document.removeEventListener('browser.closed', this.onBrowserClose)
  }

  onBrowserOpen(e) {
    // offset the banner when browser is opened
    this.shiftDown = true;
  }

  onBrowserClose(e) {
    // reset the position
    this.shiftDown = false;
  }

  info(text) {
    this.overlay.hide();

    this.fadeIn();
    this.infoMode = true;
    this.html = text;
  }

  push(text, func=null) {
    this.steps.push(() => {
      this.infoMode = false;
      this.html = text;
      if(func) func();
    })
    return this;
  }

  onClick(e) {
    if(this.infoMode) {
      // if(++this._clicks%3 == 0) {
      //   this.text = "Stop clicking me, click the button!!😤";
      // }
    }
    else {
      SoundEffect.play('banner-click');
      this.next();
    }
  }

  start() {
    return new Promise(resolve => {
      this.resolve = resolve;

      this.fadeIn();
      this.next();
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

  set shiftDown(value) {
    if(value) {
      const rect = this.banner.getBoundingClientRect();
      this.banner.style.top = `${40 + rect.height/2}px`
    }
    else {
      this.banner.style.top = 0
    }
  }

  set infoMode(flag) {
    this._infoMode = flag;
    if(flag) {
      this.banner.classList.add('info-banner')
    }
    else {
      this.banner.classList.remove('info-banner')
    }
  }

  get infoMode() {
    return this._infoMode
  }
}