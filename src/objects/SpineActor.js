import JsonPromise from '../utils/JsonPromise';
import Actor from './Actor';
import PlaceHolderComponent from '../components/PlaceHolderComponent';
import SelectionComponent from '../components/SelectionComponent';
import DragComponent from '../components/DragComponent';
import SpineComponent from '../components/SpineComponent';

export default class SpineActor extends Actor
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod)
    this.url = pod.url;

    this.loaded = JsonPromise.load(this.url).then(info => {
      this.addComponent(new PlaceHolderComponent(info.dimension));
      this.addComponent(new SelectionComponent(info.dimension));
      this.addComponent(new DragComponent(info.dimension));
      return info;
    }).then(info => {
      let loader = new PIXI.loaders.Loader();
      loader.add(info.id)
      return new Promise((resolve, reject) => {
        loader.load((loader, resources) => {
          this.spineComponent = new SpineComponent(resources[info.id].spineData);
          this.addComponent(this.spineComponent);
          resolve();
        })
      })
    })
  }

  reset() {
    super.reset();
    this.spineComponent.setToSetupPose();
  }

  async setAnimation(name, loop=true, track=0) {
    await this.loaded;
    this.spineComponent.setAnimation(name, loop, track);
  }

  async getAnimations() {
    await this.loaded;
    return this.spineComponent.getAnimations();
  }

  pod() {
    return {
      ...super.pod(),
      url: this.url
    }
  }
}
