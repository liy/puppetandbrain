import ContainerComponent from "./ContainerComponent";

export default class SpriteComponet extends ContainerComponent
{
  constructor() {
    super();

    this.graphics = new PIXI.Graphics();
    this.container.addChild(this.graphics);
  }
}