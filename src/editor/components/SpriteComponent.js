import ContainerComponent from "./ContainerComponent";

export default class SpriteComponet extends ContainerComponent
{
  constructor() {
    super();

    this.sprite = new PIXI.Sprite();
    this.sprite.anchor.set(0.5, 0.5);
    this.container.addChild(this.sprite);
  }
}