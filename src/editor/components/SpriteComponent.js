import ContainerComponent from "./ContainerComponent";

export default class SpriteComponent extends ContainerComponent
{
  constructor() {
    super();

    this.sprite = new PIXI.Sprite();
    this.sprite.anchor.set(0.5, 0.5);
    this.container.addChild(this.sprite);
  }
}