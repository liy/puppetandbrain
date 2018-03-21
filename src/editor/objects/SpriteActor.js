import PlaceHolderComponent from '../components/PlaceHolderComponent';
import Actor from './Actor';
import SpriteComponet from '../components/SpriteComponent';
import DataType from '../data/DataType';
import ImageLoader from '../resources/ImageLoader';
import { aroundAt, getMimeType } from '@/utils/utils';
import Vec2 from '../math/Vec2';
import LoaderBucket from '../resources/LoaderBucket';

export default class SpriteActor extends Actor
{
  constructor(id, activity, pod) {
    super(id, activity, pod);
  }

  async preload(pod) {
    super.preload(pod)

    this.addComponent('placeholder', new PlaceHolderComponent());
    
    let loader = new LoaderBucket(this.resources);
    let promises = pod.userFiles.map(async entry => {
      loader.add(entry.path, entry.url, entry.contentType)
    });
    
    // default sprite...
    let url = require('!file-loader!@/assets/icons/sprite-actor.png');
    promises.push(loader.add(url, url, getMimeType('png')));

    // load
    await loader.start();
    this.removeComponent('placeholder');
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

    this.emit('actor.ready', this);
  }

  set image(fileData) {
    ImageLoader.fetch(fileData).then(({image, blob, url}) => {
      this.spriteContainer.sprite.texture = PIXI.Texture.from(image);
    }).catch(e => {
      // Default image must be directly set to the texture. Not relies on an async call.
      // Otherwise, if the game started and PropertySetter set the image, a racing
      // condition would arised, you will get unexpected behaviours, ie, the default
      // image might override the later PropertySetter image.
      var image = new Image();
      image.src = require('!file-loader!@/assets/icons/sprite-actor.png');
      this.spriteContainer.sprite.texture = PIXI.Texture.from(image);
    })
  }

  get image() {
    // return this.content.imageUrl
    return this.properties.get('image').data
  }

  sortDepth() {
    // bring it to front
    Hub.stage.addChild(this.spriteContainer.container);
  }

  select() {
    super.select();

    this.spriteContainer.container.filters = [this.selectOutline]
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

      let texture = Hub.stage.renderer.generateTexture(this.spriteContainer.container);
      let canvas = Hub.stage.renderer.extract.canvas(texture);
      // reset back to original state
      this.spriteContainer.container.filters = outlineFilters
      resolve(canvas);
    })
  }
}
