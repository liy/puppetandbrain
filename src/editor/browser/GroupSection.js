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

  set color(c) {
    c = c || 0x717171;
    this.element.style.backgroundColor = `#${c.toString(16)}`;
  }

  add(gridBox) {
    this.grid.appendChild(gridBox.element)
  }
}