import PlaceHolderComponent from '../components/PlaceHolderComponent';
import Actor from './Actor';

export default class SpriteActor extends Actor
{
  constructor(url, id) {
    super(id);
    
    let sprite = PIXI.Sprite.fromImage(url);
    this.loaded = new Promise((resolve, reject) => {
      sprite.texture.baseTexture.on('loaded', resolve)
    })
    this.addChild(sprite);

    this.addComponent(new PlaceHolderComponent());
  }
}
