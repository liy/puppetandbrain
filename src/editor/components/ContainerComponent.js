const filters = require('pixi-filters');
import Component from "./Component";

/**
 * Handles transform...
 */
export default class ContainerComponent extends Component
{
  constructor() {
    super();

    this.container = new PIXI.Container();
    this.container.interactive = true;
    
    this.paperOutlineTickness = 8;
    this.paperOutline = new filters.OutlineFilter(this.paperOutlineTickness, 0xFFFFFF)
    this.paper = false;
  }

  set paper(p) {
    this._paper = p;
    if(p) {
      this.container.filters = [this.paperOutline];
    }
    else {
      this.container.filters = [];
    }
  }

  get paper() {
    return this._paper;
  }

  onStage() {
    console.log('on stage', this.container.interactive)
    ActivityManager.stage.addChild(this.container);
    this.container.on('pointerdown', this.pointerDown, this);
    this.container.on('pointerup', this.pointerUp, this);
    this.container.on('mouseover', this.mouseOver, this);
    this.container.on('mouseout', this.mouseOut, this);
    this.container.on('rightclick', this.rightClick, this);
  }

  offStage() {
    console.log('off stage')
    ActivityManager.stage.removeChild(this.container);
    this.container.off('pointerdown', this.pointerDown, this);
    this.container.off('pointerup', this.pointerUp, this);
    this.container.off('mouseover', this.mouseOver, this);
    this.container.off('mouseout', this.mouseOut, this);
  }

  pointerDown(e) {
    console.log('down!!')
    let p = e.data.getLocalPosition(this.container.parent)
    this.entity.pointerDown(p.x, p.y, e);
  }

  pointerUp(e) {
    this.entity.pointerUp(e);
  }

  mouseOver(e) {
    this.entity.mouseOver(e);
  }

  mouseOut(e) {
    this.entity.mouseOut(e);
  }

  rightClick(e) {
    this.entity.contextMenu(e.data.originalEvent);
  }

  defaultFilter() {
    this.container.filters = this.paper ? [this.paperOutline] : [];
  }

  updateTransform() {
    // I have no idea how to update pixi's matrix... so manual transform here. But it is 
    // probably has better perfomance, since we did not have matrix calculation twice...
    this.container.x = this.entity.position.x;
    this.container.y = this.entity.position.y;
    this.container.rotation = this.entity.rotation;
    this.container.scale = this.entity.scale;

    if(this.paper) {
      let filterArea = this.container.getBounds();
      filterArea.pad(this.paperOutlineTickness);
      this.container.filterArea = filterArea;
    }
  }
}