import ArrayMap from "../../utils/ArrayMap";

export default class DummyBlock
{
  constructor(data) {
    this.node = node;
    this.brain = this.node.brain;
    this.id = this.node.id;

    this.inputPins = new ArrayMap();
    this.outputPins = new ArrayMap();

    this.container = document.createElement('div');
    this.container.className = `block`;

    this.title = document.createElement('div');
    this.title.className = 'title'
    this.container.appendChild(this.title);
    this.title.textContent = data.nodeName;

    this.dragArea = document.createElement('div');
    this.dragArea.className = 'drag-area';
    this.container.appendChild(this.dragArea)

    this.content = document.createElement('div');
    this.content.className = `content ${data.className}-block`;
    this.container.appendChild(this.content);

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