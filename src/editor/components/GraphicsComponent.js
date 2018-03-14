import ContainerComponent from "./ContainerComponent";

export default class GraphicsComponent extends ContainerComponent
{
  constructor() {
    super();

    this.graphics = new PIXI.Graphics();
    this.container.addChild(this.graphics);
  }
}