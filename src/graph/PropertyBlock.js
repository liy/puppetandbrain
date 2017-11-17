import TaskBlock from "./TaskBlock";
import OutputPin from "./OutputPin";
import Block from "./Block";

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

    this.outputPin = new OutputPin(this.model.name);
    row.appendChild(this.outputPin.container);
    this.outputPins[node.name] = this.outputPin;
  }

  dragmove(e) {
    super.dragmove(e);

    this.outputPin.drawConnection();
  }
}