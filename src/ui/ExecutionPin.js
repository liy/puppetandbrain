require('../css/ExecutionPin.scss')

export default class ExecutionPin
{
  constructor(name, location='left') {
    this.connectedPin = null

    this.svg = document.getElementById('svg');

    this.container = document.createElement('div');
    this.container.className = 'execution-pin';

    this.icon =  document.createElement('div');
    this.icon.className = 'icon'
    this.container.appendChild(this.icon);

    this.label = document.createElement('div');
    this.label.className = 'label'
    this.label.textContent = (name == 'default') ? '' : name;
    this.container.appendChild(this.label)

    this.container.style = `float:${location}; clear:${location};`
    this.label.style = `float:${location};`
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }

  get isConnected() {
    return this.connectedPin != null;
  }
}