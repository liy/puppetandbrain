import Block from "./Block";
import AOutputPin from "../support/AOutputPin";

export default class GetterBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    // GetterNode actually use variable id as the name by default
    this.outputPin = this.outputPins.get(node.variableID);

    // change the output pin's name from id to actual name
    this.outputPin.label.textContent = node.variableName;
    // also listening on name changes from the variable
    this.onNameChanged = this.onNameChanged.bind(this);
    node.variable.on('variable.name.changed', this.onNameChanged)
  }

  destroy() {
    super.destroy();
    this.node.variable.off('variable.name.changed', this.onNameChanged)
  }

  onNameChanged(data) {
    this.outputPin.label.textContent = data.name;
  }

  template(pod) {
    if(pod.elementClass) {
      for(let className of pod.elementClass) {
        this.element.classList.add(className);
      }
    }

    this.title.textContent = pod.name;

    let pin = new AOutputPin(LookUp.get(pod.variableID).name);
    this.body.addRight(pin);

    this.element.style.position = 'relative'

    this.body.element.addEventListener('mousedown', e => {
      console.log(e)
      this.emit('block.chosen', pod);
    }, {capture:true});
  }
}