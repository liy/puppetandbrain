const filters = require('pixi-filters');
import Actor from './Actor';
import PlaceHolderComponent from '../components/PlaceHolderComponent';
import SpineComponent from '../components/SpineComponent';
import {LoaderBucket, Resource} from '../resources/Resource';
import { aroundAt } from '../utils/utils';
import Vec2 from '../math/Vec2';

export default class SpineActor extends Actor
{
  constructor(id) {
    super(id);
    
    this.selectOutline = new filters.OutlineFilter(4, 0xc95ce8)
    this.hoverOutline = new filters.OutlineFilter(3, 0xdbace8)
  }

  async preload(pod) {
    let pos = pod.position || { x: aroundAt(Editor.stage.stageWidth/2), y: aroundAt(Editor.stage.stageHeight/2) };
    this.position = new Vec2(pos);
    this.rotation = pod.rotation || 0;
    this.scale = pod.scale || {x:1,y:1}

    this.addComponent('placeholder', new PlaceHolderComponent(pod.dimension));
    
    // official predefined resources
    // load all resources in parallel
    let loader = new LoaderBucket();
    await Promise.all(pod.libFiles.map(async entry => {
      let path = `${pod.libDir}/${pod.puppetID}/${entry.fileName}`;
      let url = await API.getUrl(path)
      loader.add(path, url, entry.contentType)
    }))
    await loader.start();

    this.removeComponent('placeholder');
  }

  init(pod) {
    super.init(pod)

    // Spine id is the file name of the spine json file.
    this.spineID = pod.spineID;
    this.spineScale = pod.spineScale || 1;

    let spineDir = `${pod.libDir}/${pod.puppetID}`;
    let rawAtlas = Resource.get(`${spineDir}/${this.spineID}.atlas`);
    var spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlas, function(line, callback) {
        // pass the image here.
        callback(PIXI.BaseTexture.from(Resource.get(`${spineDir}/${line}`)));
    }); 

    var spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas)
    var spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);

    spineJsonParser.scale = this.spineScale; 

    var spineData = spineJsonParser.readSkeletonData(Resource.get(`${spineDir}/${this.spineID}.json`));

    this.spineComponent = new SpineComponent(spineData);
    this.addComponent('animation', this.spineComponent);
    
    this.emit('actor.ready', this);
  }

  gameStop() {
    super.gameStop();
    this.spineComponent.setToSetupPose();
  }

  setAnimation(name, loop=true, track=0) {
    this.spineComponent.setAnimation(name, loop, track);
  }

  getAnimations() {
    return this.spineComponent.getAnimations();
  }
  
  select() {
    super.select();

    this.spineComponent.container.filters = [this.selectOutline]
    // bring it to front
    Editor.stage.addChild(this.spineComponent.container);
  }

  deselect() {
    super.deselect();
    this.spineComponent.container.filters = [];
  }

  mouseOver() {
    super.mouseOver();
    if(!this.selected) {
      this.spineComponent.container.filters = [this.hoverOutline]
    }
  }

  mouseOut() {
    super.mouseOut();
    if(!this.selected) {
      this.spineComponent.container.filters = []
    }
    else {
      this.spineComponent.container.filters = [this.selectOutline]
    }
    
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.spineID = this.spineID;
    pod.spineScale = this.spineScale;
    return pod;
  }

  snapshot() {
    return new Promise(resolve => {
      let texture = Editor.renderer.generateTexture(this.spineComponent.container);
      let canvas = Editor.renderer.extract.canvas(texture);
      canvas.id = 'snapshot-canvas';
      resolve(canvas);
    })
  }
}
