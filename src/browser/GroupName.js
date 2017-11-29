require('./GroupName.scss')

export default class GroupName
{
  constructor(name) {
    this.element = document.createElement('div');
    this.element.className = 'group-name';
    this.element.textContent = name;
  }
}