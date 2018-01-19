import Component from './Component'

export default class DragComponent extends Component
{
  constructor() {
    super();
  }

  destroy() {
    super.destroy();
    this.entity.off('pointerdown', this.dragstart, this)
    this.entity.off('pointermove', this.dragmove, this)
    this.entity.off('pointerup', this.dragend, this)
    this.entity.off('pointerupoutside', this.dragend, this)
  }

  added() {
    this.entity.interctive = true;

    this.entity.on('pointerdown', this.dragstart, this)
    this.entity.on('pointermove', this.dragmove, this)
    this.entity.on('pointerup', this.dragend, this)
    this.entity.on('pointerupoutside', this.dragend, this)
  }

  dragstart(e) {
    this.data = e.data;
    let p = this.data.getLocalPosition(this.entity.parent)
    this.offset = {
      x: this.entity.x - p.x,
      y: this.entity.y - p.y
    }

    // crete move command, when move update it with new position
    this.moveCommand = Commander.create('MoveActor', this.entity);
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
    
    // update entity's new position
    if(this.moveCommand) History.push(this.moveCommand.processAndSave());
  }
}