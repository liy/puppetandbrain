export default class APin
{
  constructor(name, flow) {
    this.element = document.createElement('div');

    this.label = document.createElement('span');
    this.label.textContent =  (name == 'default') ? '' : name;
    this.element.appendChild(this.label);
  }
}