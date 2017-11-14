import TaskBlock from "./TaskBlock";
import OutputPin from "./OutputPin";

export default class PropertyBlock extends TaskBlock
{
  constructor(propertyGetter) {
    super(propertyGetter);

    this.title.textContent = `Get ${propertyGetter.name} of ${propertyGetter.target.name}`;

    let pin = new OutputPin(this.model.name);
    this.content.appendChild(pin.dom);
    this.outputPins[propertyGetter.name] = pin;
  }
}