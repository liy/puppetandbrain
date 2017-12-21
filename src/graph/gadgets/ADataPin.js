import DataPinSVG from "./DataPinSVG";

export default class
{
  constructor(name) {
    this.element = document.createElement('div');

    this.label = document.createElement('span');
    this.label.textContent = name;
    this.element.appendChild(this.label);

    this.icon = new DataPinSVG();
    this.element.appendChild(this.icon.element)
  }
}