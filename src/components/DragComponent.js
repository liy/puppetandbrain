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
    this.entity.interctive = true;

    this.entity.on('pointerdown', this.dragstart)
    this.entity.on('pointermove', this.dragmove)
    this.entity.on('pointerup', this.dragend)
    this.entity.on('pointerupoutside', this.dragend)
  }

  dragstart(e) {
    this.data = e.data;
    let p = this.data.getLocalPosition(this.entity.parent)
    this.offset = {
      x: this.entity.x - p.x,
      y: this.entity.y - p.y
    }
  }

  dragmove(e) {
    // console.log(e.data)
    if(this.data) {
      var newPosition = this.data.getLocalPosition(this.entity.parent);
      this.entity.x = newPosition.x + this.offset.x;
      this.entity.y = newPosition.y + this.offset.y;
    }
  }

  dragend() {
    this.data = null;
  }
}