require('../css/DataPin.scss')

export default class DataPin
{
  constructor(name) {
    this.name = name;
    this.svg = document.getElementById('svg');

    this.container = document.createElement('div');
    this.container.className = 'data-pin'

    this.icon =  document.createElement('div');
    this.icon.className = 'icon'
    this.container.appendChild(this.icon);

    this.label = document.createElement('div');
    this.label.className = 'label'
    this.label.textContent = name;
    this.container.appendChild(this.label)
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}