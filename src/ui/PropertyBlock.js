import TaskBlock from "./TaskBlock";
import OutputPin from "./OutputPin";
import Block from "./Block";

export default class PropertyBlock extends Block
{
  constructor(propertyGetter) {
    super(propertyGetter);

    let minWidth = 200;
    let minHeight = 40;
    this.container.style = `min-height:${minHeight}px; min-width:${minWidth}px; padding-bottom:5px; background:rgba(242, 245,251, 0.7); position:absolute; border-radius:5px; font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;`;    

    this.title = document.createElement('div');
    this.title.style = 'user-select:none; cursor:default; background:rgba(192, 196, 206, 0.85); border-radius:5px 5px 0 0; padding:5px 10px;'
    this.container.appendChild(this.title);
    this.title.textContent = `Get ${propertyGetter.name} of ${propertyGetter.target.name}`;

    this.content = document.createElement('div');
    this.container.appendChild(this.content);

    let row = document.createElement('div');
    row.style = 'height:16px; margin-left:5px; margin-right:5px; margin-top:3px;';
    this.content.appendChild(row);

    this.outputPin = new OutputPin(this.model.name);
    row.appendChild(this.outputPin.container);
    this.outputPins[propertyGetter.name] = this.outputPin;
  }

  dragmove(e) {
    super.dragmove(e);

    this.outputPin.drawConnection();
  }
}