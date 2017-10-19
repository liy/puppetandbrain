import Actor from './Actor';
import PlaceHolderComponent from '../components/PlaceHolderComponent';
import SelectionComponent from '../components/SelectionComponent';
import DragComponent from '../components/DragComponent';

export default class SpriteActor extends Actor
{
  constructor(url) {
    super();
    
    let sprite = PIXI.Sprite.fromImage(url);
    this.loaded = new Promise((resolve, reject) => {
      sprite.texture.baseTexture.on('loaded', resolve)
    })
    this.addChild(sprite);

    this.addComponent(new PlaceHolderComponent());
    this.addComponent(new SelectionComponent());
    this.addComponent(new DragComponent());
  }

  serialize() {

  }

  static descerialize(str) {

  }
}
