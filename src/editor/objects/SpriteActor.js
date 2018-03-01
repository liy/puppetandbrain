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
  constructor(id, activity) {
    super(id, activity);
  }

  async preload(pod) {
    let pos = pod.position || { x: aroundAt(Hub.stage.stageWidth/2), y: aroundAt(Hub.stage.stageHeight/2) };
    this.position = new Vec2(pos);
    this.rotation = pod.rotation || 0;
    this.scale = new Vec2(pod.scale || {x:1,y:1});

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
      // In theory the default sprite is already in activity.resources, you can directly get it without fetch
      // default sprite
      ImageLoader.fetch({url:require('!file-loader!@/assets/icons/sprite-actor.png')}).then(({image}) => {
        this.spriteContainer.sprite.texture = PIXI.Texture.from(image);
      })
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
    Hub.stage.addChild(this.spriteContainer.container);
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
