import DummyBlock from "./DummyBlock";
require('./GroupSection.scss');

export default class GroupSection
{
  constructor(name) {
    this.element = document.createElement('div');
    this.element.className = 'group-section';

    this.title = document.createElement('div');
    this.title.className = 'group-name';
    this.title.textContent = name;
    this.element.appendChild(this.title);
    this.grid = document.createElement('div');
    this.grid.className = 'group-grid';
    this.element.appendChild(this.grid);

    let len = Math.floor(Math.random()*20);
    for(let i=0; i<len; ++i) {
      let block = new DummyBlock({nodeName: 'test'})
      this.grid.appendChild(block.gridBox);
    }
  }
}