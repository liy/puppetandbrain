import Component from './Component';
import Selection from '../Selection';

// TODO: maybe use a outline filter instead???
export default class SelectionBoxComponent extends Component
{
  constructor(dimension) {
    super();

    this.dimension = dimension;
    
    this.mousedown = this.mousedown.bind(this);
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.touchstart = this.touchstart.bind(this);

    this.selectionBox = new PIXI.Graphics();
    this.selected = false;
  }

  added() {
    this.owner.interactive = true;
    this.owner.on('mousedown', this.mousedown);
    this.owner.on('mouseover', this.mouseover);
    this.owner.on('mouseout', this.mouseout);
    this.owner.on('touchstart', this.touchstart);
    this.owner.addChild(this.selectionBox)

    this.tickEnabled = true;
  }
  
  select() {
    // TODO: handle muti-selection
    Selection.set(this.owner);

    this.selected = true;
    this.selectionBox.visible = true;
    this.selectionBox.clear();
    this.selectionBox.lineStyle(2, 0x55FF55);
    this.selectionBox.drawRect(-this.dimension.x/2, -this.dimension.y/2, this.dimension.x, this.dimension.y)
    this.selectionBox.endFill();
  }

  deselect() {
    Selection.remove(this.owner);
    this.owner.alpha = 1

    this.selected = false;
    this.selectionBox.visible = false;
  }

  mousedown() {
    this.select();
  }

  mouseover() {
    if(!this.selected) {
      this.selectionBox.visible = true;
      this.selectionBox.clear();
      this.selectionBox.lineStyle(1, 0xFFFFFF, 0.5);
      this.selectionBox.drawRect(-this.dimension.x/2, -this.dimension.y/2, this.dimension.x, this.dimension.y)
      this.selectionBox.endFill();
    }
  }

  mouseout() {
    this.selectionBox.visible = this.selected;
  }

  touchstart() {
    this.select();
  }

  tick() {
  }
}