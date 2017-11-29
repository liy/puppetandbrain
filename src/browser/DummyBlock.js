require('./DummyBlock.scss')
import ArrayMap from "../utils/ArrayMap";

export default class DummyBlock
{
  constructor(data) {
    this.inputPins = new ArrayMap();
    this.outputPins = new ArrayMap();

    this.gridBox = document.createElement('div');
    this.gridBox.className = `grid-box`;

    this.element = document.createElement('div');
    this.element.className = `block dummy-block`;
    this.gridBox.appendChild(this.element);

    this.title = document.createElement('div');
    this.title.className = 'title'
    this.element.appendChild(this.title);
    this.title.textContent = data.nodeName;

    this.dragArea = document.createElement('div');
    this.dragArea.className = 'drag-area';
    this.element.appendChild(this.dragArea)

    this.content = document.createElement('div');
    this.content.className = `content task-block`;
    this.element.appendChild(this.content);
    this.content.style.minWidth = '100px';
    this.content.style.minHeight = '100px';

    this.rows = [];
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