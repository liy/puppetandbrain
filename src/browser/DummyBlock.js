require('./DummyBlock.scss')
import ArrayMap from "../utils/ArrayMap";

export default class DummyBlock
{
  constructor(data) {
    this.data = data;
    this.rows = [];

    this.gridBox = document.createElement('div');
    this.gridBox.className = `grid-box`;

    this.element = document.createElement('div');
    this.element.className = `block dummy-block`;
    this.gridBox.appendChild(this.element);

    this.title = document.createElement('div');
    this.title.className = 'title'
    this.element.appendChild(this.title);
    this.title.textContent = this.data.nodeName;

    this.dragArea = document.createElement('div');
    this.dragArea.className = 'drag-area';
    this.element.appendChild(this.dragArea)

    this.content = document.createElement('div');
    this.content.className = `content task-block`;
    this.element.appendChild(this.content);
    // this.content.style.minWidth = '100px';
    // this.content.style.minHeight = '100px';
    this.content.style.width = 50 + Math.floor(Math.random()*70) + 'px'
    this.content.style.height = 90 + Math.floor(Math.random()*50) + 'px'


    if(this.data.in) {
      let pin = new DummyExecutionPin('', 'left');
      this.getRow(0).appendChild(pin.container);
    }

    // out pins
    for(let i=0; i<this.data.out.length; ++i) {
      let executionName = this.data.out[i]
      let pin = new DummyExecutionPin(executionName, 'right');
      this.getRow(i).appendChild(pin.container)
    }

    for(let i=0; i<this.data.inputs.length; ++i) {
      let name = this.data.inputs[i];
      let pin = new InputPin(name, 'left')
      this.getRow(i+1).appendChild(pin.container);
    }

    for(let i=0; i<this.data.outputs.length; ++i) {
      let name = this.data.outputs[i];
      let pin = new OutputPin(name, 'right');
      this.getRow(this.data.out.length + i).appendChild(pin.container);
    }

  }

  getRow(i) {
    if(!this.rows[i]) {
      this.rows[i] = document.createElement('div');
      this.rows[i].className = 'row';
      this.content.appendChild(this.rows[i]);
    }
    return this.rows[i]
  }
}