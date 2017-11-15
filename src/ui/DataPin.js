export default class DataPin
{
  constructor(name) {
    this.name = name;
    this.svg = document.getElementById('svg');

    this.container = document.createElement('div');

    this.pin =  document.createElement('div');
    this.container.appendChild(this.pin);

    this.label = document.createElement('div');
    this.label.textContent = name
    this.container.appendChild(this.label)
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.pin.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}