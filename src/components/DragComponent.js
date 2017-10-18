import Component from './Component'

export default class DragComponent extends Component
{
  constructor() {
    super();

    this.dragstart = this.dragstart.bind(this);
    this.dragmove = this.dragmove.bind(this);
    this.dragend = this.dragend.bind(this);
  }

  added() {
    this.owner.interctive = true;

    this.owner.on('pointerdown', this.dragstart)
    this.owner.on('pointermove', this.dragmove)
    this.owner.on('pointerup', this.dragend)
    this.owner.on('pointerupoutside', this.dragend)
  }

  dragstart(e) {
    this.data = e.data;
    let p = this.data.getLocalPosition(this.owner.parent)
    this.offset = {
      x: this.owner.x - p.x,
      y: this.owner.y - p.y
    }
  }

  dragmove(e) {
    // console.log(e.data)
    if(this.data) {
      var newPosition = this.data.getLocalPosition(this.owner.parent);
      this.owner.x = newPosition.x + this.offset.x;
      this.owner.y = newPosition.y + this.offset.y;
    }
  }

  dragend() {
    this.data = null;
  }
}