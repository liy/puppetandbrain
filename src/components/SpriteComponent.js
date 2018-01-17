import ContainerComponent from "./ContainerComponent";

export default class SpriteComponet extends ContainerComponent
{
  constructor() {
    super();

    this.sprite = new PIXI.Sprite();
    this.container.addChild(this.sprite);
  }
}