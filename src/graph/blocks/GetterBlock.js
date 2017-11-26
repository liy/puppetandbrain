import Block from "./Block";
import OutputPin from "../OutputPin";

export default class GetterBlock extends Block
{
  constructor(node) {
    super(node);

    let minWidth = 130;
    let minHeight = 40;
    this.container.className += ' getter-block'
    this.container.style.minWidth = `${minWidth}px`;
    this.container.style.minHeight = `${minHeight}px`;
    let rows = [];
    let row = (i) => {
      if(!rows[i]) {
        rows[i] = document.createElement('div');
        rows[i].className = 'row';
        this.content.appendChild(rows[i]);
      }
      return rows[i]
    }

    this.outputPin = new OutputPin(this, this.node.variableName);
    row(0).appendChild(this.outputPin.container);
    this.outputPins.set(this.node.variableName, this.outputPin);
  }

  dragmove(e) {
    super.dragmove(e);
    this.outputPin.drawConnection();
  }
}