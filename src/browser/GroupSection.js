require('./GroupSection.scss');

export default class GroupSection
{
  constructor(name) {
    this.element = document.createElement('div');
    this.element.className = 'group-section';

    this.title = document.createElement('span');
    this.title.className = 'group-name';
    this.title.textContent = name;
    this.element.appendChild(this.title);
    this.grid = document.createElement('div');
    this.grid.className = 'group-grid';
    this.element.appendChild(this.grid);
  }

  addBlock(block) {
    const gridBox = document.createElement('div');
    gridBox.className = 'grid-box';
    gridBox.appendChild(block.element);
    
    this.grid.appendChild(gridBox)
  }

  append(item) {
    const gridBox = document.createElement('div');
    gridBox.className = 'grid-box';
    gridBox.appendChild(item.element);
    
    this.grid.appendChild(gridBox)
  }
}