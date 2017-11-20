import OutputPin from "../OutputPin";
import Block from "./Block";
import InputPin from "../InputPin";

export default class PropertyBlock extends Block
{
  constructor(node) {
    super(node);

    let minWidth = 200;
    let minHeight = 40;
    this.container.className += ' property-block'
    this.container.style = `min-height:${minHeight}px; min-width:${minWidth}px;`;

    this.title = document.createElement('div');
    this.title.className = 'title'
    this.container.appendChild(this.title);
    this.title.textContent = node.nodeName

    this.content = document.createElement('div');
    this.container.appendChild(this.content);

    let row = document.createElement('div');
    row.className = 'row'
    this.content.appendChild(row);

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let pointer = this.node.inputs.get(name);
      let pin = new InputPin(name)
      row.appendChild(pin.container);
      this.inputPins.set(name, pin);

      if(pointer.isLocalPointer) {
        let inputField = document.createElement('input');
        inputField.value = pointer.value;
        pin.inputField = inputField;
        pin.container.appendChild(inputField)
      }
    }

    this.outputPin = new OutputPin(this.node.name);
    row.appendChild(this.outputPin.container);
    this.outputPins.set(node.name, this.outputPin);
  }

  dragmove(e) {
    super.dragmove(e);

    this.outputPin.drawConnection();
  }
}