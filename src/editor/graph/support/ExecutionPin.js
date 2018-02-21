import './ExecutionPin.scss';
import Pin from "./Pin";

export default class extends Pin
{
  constructor(name, flow) {
    super(name, flow);

    this.element.className = 'execution-pin'
  }
}