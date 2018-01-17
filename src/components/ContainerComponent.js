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

  added() {
    Stage.addChild(this.container);
    this.container.on('pointerdown', this.pointerDown, this);
  }

  removed() {
    Stage.removeChild(this.container);
    this.container.off('pointerdown', this.pointerDown, this);
  }

  pointerDown(e) {
    this.data = e.data;
    let p = this.data.getLocalPosition(this.container.parent)
    let offset = {
      x: (this.container.x - p.x),
      y: (this.container.y - p.y)
    }
    
    this.entity.mouseDown(p.x, p.y, offset);
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