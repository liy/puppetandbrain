require('./ContentSection.scss')
import DummyBlock from "./DummyBlock";
import GroupName from './GroupName';
import GroupGrid from './GroupGrid';

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
    for(let i=0; i<1; ++i) {
      let groupName = new GroupName('group'+i);
      this.content.appendChild(groupName.element);
      let groupGrid = new GroupGrid();
      this.content.appendChild(groupGrid.element);
    }
  }
}