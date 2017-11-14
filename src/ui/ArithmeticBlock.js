import TaskBlock from "./TaskBlock";
import OutputPin from "./OutputPin";

export default class ArithmeticBlock extends TaskBlock
{
  constructor(model) {
    super(model);

    if(this.model.value) {
      let pin = new OutputPin('value');
      this.varSection.appendChild(pin.dom);
    }
  }
}