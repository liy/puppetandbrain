const filters = require('pixi-filters');
import JsonPromise from '../utils/JsonPromise';
import Actor from './Actor';
import PlaceHolderComponent from '../components/PlaceHolderComponent';
import SpineComponent from '../components/SpineComponent';

export default class SpineActor extends Actor
{
  constructor(id) {
    super(id);
    
    this.selectOutline = new filters.OutlineFilter(4, 0xc95ce8)
    this.hoverOutline = new filters.OutlineFilter(3, 0xdbace8)
  }

  init(pod) {
    super.init(pod)
    this.url = pod.url;
  }

  gameStop() {
    super.gameStop();
    this.spineComponent.setToSetupPose();
  }

  setAnimation(name, loop=true, track=0) {
    this.loaded.then(() => {
      this.spineComponent.setAnimation(name, loop, track);
    }).catch(e => {
      // TODO: find a generic way to handle error
      console.error(e);
    })
  }

  async getAnimations() {
    await this.loaded;
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
    if(!this.selected && this.loaded) {
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
    pod.url = this.url;
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
