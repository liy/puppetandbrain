import {mixin} from './utils/mixin.js';
import Entity from './Entity';
import PlaceHolderComponent from './components/PlaceHolderComponent';

export default class SpriteObject extends PIXI.Container
{
  constructor(url) {
    super();
    mixin(this, new Entity());

    this.id = url;

    let sprite = PIXI.Sprite.fromImage(url);
    sprite.texture.baseTexture.on('loaded', () => {
      this.emit('loaded');
    })
    this.addChild(sprite);

    this.addComponent(new PlaceHolderComponent());
  }
}
