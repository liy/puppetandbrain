import PlaceHolderComponent from '../components/PlaceHolderComponent';
import Actor from './Actor';
import SpriteComponet from '../components/SpriteComponent';
import DataType from '../data/DataType';
import ImageLoader from '../resources/ImageLoader';

export default class SpriteActor extends Actor
{
  constructor(id) {
    super(id);
    
    // let sprite = PIXI.Sprite.fromImage(url);
    // this.loaded = new Promise((resolve, reject) => {
    //   sprite.texture.baseTexture.on('loaded', resolve)
    // })
    // this.addChild(sprite);

    // this.addComponent(new PlaceHolderComponent());

  }

  init(pod={}) {
    super.init(pod);
    
    this.spriteContainer = this.addComponent('sprite-component', new SpriteComponet());

    pod.properties = pod.properties || {};
    this.properties.add({
      data: pod.properties.image || {},
      propertyName: 'image',
      descriptor: {
        type: DataType.IMAGE,
        iconID: "🖼️"
      }
    });
  }

  set image(fileData) {
    ImageLoader.fetch(fileData).then(({image, blob, url}) => {
      // this.content.imageUrl = image.src;
      this.spriteContainer.sprite.texture = PIXI.Texture.from(image);
    }).catch(e => {
      this.spriteContainer.sprite.texture = PIXI.Texture.from(require('!file-loader!../assets/icons/sprite-actor.png'));
    })
  }

  get image() {
    // return this.content.imageUrl
    return this.properties.get('image').data
  }

  select() {
    super.select();

    this.spriteContainer.container.filters = [this.selectOutline]
    // bring it to front
    Editor.stage.addChild(this.spriteContainer.container);
  }

  deselect() {
    super.deselect();
    this.spriteContainer.defaultFilter();
  }

  snapshot() {
    return new Promise(resolve => {
      // do not show filters in snapshot
      let outlineFilters = this.spriteContainer.container.filters;
      this.spriteContainer.container.filters = []

      let texture = Editor.renderer.generateTexture(this.spriteContainer.container);
      let canvas = Editor.renderer.extract.canvas(texture);
      // reset back to original state
      this.spriteContainer.container.filters = outlineFilters
      resolve(canvas);
    })
  }
}
