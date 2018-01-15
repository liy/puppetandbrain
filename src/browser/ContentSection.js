require('./ContentSection.scss')
import GroupSection from './GroupSection';

export default class ContentSection
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'browser-content-scroll-wrapper';

    this.scroll = document.createElement('div');
    this.scroll.className = 'browser-content-scroll';
    this.element.appendChild(this.scroll);

    this.content = document.createElement('div');
    this.content.className = 'browser-content';
    this.content.setAttribute('placeholder', 'Cannot find the block you are looking for...👻 Please try other keywords.');
    this.scroll.appendChild(this.content);
  }

  addGroup(group) {
    this.content.appendChild(group.element);
  }

  clear() {
    while(this.content.lastChild) {
      this.content.removeChild(this.content.lastChild);
    }
  }

  resetScroll() {
    this.scroll.scrollTop = 0;
  }
}