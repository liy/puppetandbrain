import './AExecutionPin.scss';
import APin from "./APin";

export default class extends APin
{
  constructor(name, flow) {
    super(name, flow);

    this.element.className = 'execution-pin'
  }
}