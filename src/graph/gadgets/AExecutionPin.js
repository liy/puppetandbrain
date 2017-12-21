import ExecutionPinSVG from "./ExecutionPinSVG";

export default class AExecutionPin
{
  constructor(name) {
    this.element = document.createElement('div');

    this.label = document.createElement('span');
    this.label.textContent = name;
    this.element.appendChild(this.label);

    this.icon = new ExecutionPinSVG();
    this.element.appendChild(this.icon.element)
  }
}