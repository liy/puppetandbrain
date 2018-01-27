require('./ContentSection.scss')
import GroupSection from './GroupSection';

export default class ContentSection
{
  constructor() {
    this.colorPalette = null;
    
    this.element = document.createElement('div');
    this.element.className = 'browser-content-scroll-wrapper';

    this.scroll = document.createElement('div');
    this.scroll.className = 'browser-content-scroll';
    this.element.appendChild(this.scroll);

    this.content = document.createElement('div');
    this.content.className = 'browser-content';
    this.content.setAttribute('placeholder', 'Cannot find the item you are looking for...👻 Please try other keywords.');
    this.scroll.appendChild(this.content);

    this.groups = new Map();
  }

  set placeholder(placeholder) {
    this.content.setAttribute('placeholder', placeholder);
  }
  
  add(gridBox, groupName) {
    let group = this.groups.get(groupName);
    if(!group) {
      group = new GroupSection(groupName);
      if(this.colorPalette) group.color = this.colorPalette[groupName];
      this.groups.set(groupName, group);
      this.content.appendChild(group.element);
    }
    group.add(gridBox);
  }

  clear() {
    while(this.content.lastChild) {
      this.content.removeChild(this.content.lastChild);
    }
    this.groups.clear();
  }

  resetScroll() {
    this.scroll.scrollTop = 0;
  }
}