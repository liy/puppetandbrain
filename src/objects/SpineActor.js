import JsonPromise from '../utils/JsonPromise';
import CanvasActor from './CanvasActor';
import PlaceHolderComponent from '../components/PlaceHolderComponent';
import SelectionComponent from '../components/SelectionComponent';
import DragComponent from '../components/DragComponent';
import SpineComponent from '../components/SpineComponent';

export default class SpineActor extends CanvasActor
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod)
    this.url = pod.url;

    this.loaded = JsonPromise.load(this.url).then(info => {
      this.name = info.name;
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
          this.addComponent('animation', this.spineComponent);
          resolve();
        })
      })
    })
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

  pod(detail) {
    let pod = super.pod(detail);
    pod.url = this.url;
    return pod;
  }
}
