import JsonPromise from '../utils/JsonPromise';
import Actor from './Actor';
import PlaceHolderComponent from '../components/PlaceHolderComponent';
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
      this.name = info.name;
      this.addComponent('placeholder', new PlaceHolderComponent(info.dimension));
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

  
  select() {
    super.select();

    // bring it to front
    Editor.stage.addChild(this.spineComponent.container);
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.url = this.url;
    return pod;
  }
}
