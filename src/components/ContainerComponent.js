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
  }

  onStage() {
    Editor.stage.addChild(this.container);
    this.container.on('pointerdown', this.pointerDown, this);
    this.container.on('pointerup', this.pointerUp, this);
    this.container.on('mouseover', this.mouseOver, this);
    this.container.on('mouseout', this.mouseOut, this);
  }

  offStage() {
    Editor.stage.removeChild(this.container);
    this.container.off('pointerdown', this.pointerDown, this);
    this.container.off('pointerup', this.pointerUp, this);
    this.container.off('mouseover', this.mouseOver, this);
    this.container.off('mouseout', this.mouseOut, this);
  }

  pointerDown(e) {
    let p = e.data.getLocalPosition(this.container.parent)
    this.entity.pointerDown(p.x, p.y);
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

  updateTransform() {
    // I have no idea how to update pixi's matrix... so manual transform here. But it is 
    // probably has better perfomance, since we did not have matrix calculation twice...
    this.container.x = this.entity.position.x;
    this.container.y = this.entity.position.y;
    this.container.rotation = this.entity.rotation;
    this.container.scale = this.entity.scale;
  }
}