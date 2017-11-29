require('./ContentSection.scss')
import DummyBlock from "./DummyBlock";
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
    this.scroll.appendChild(this.content);

    // 5 groups
    for(let i=0; i<5; ++i) {
      let group = new GroupSection('Group ' + i);
      this.content.appendChild(group.element);
    }
  }
}