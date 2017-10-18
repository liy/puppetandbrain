import InfoLoader from './InfoLoader';
import {mixin} from './utils/mixin.js';
import Entity from './Entity';
import PlaceHolderComponent from './components/PlaceHolderComponent';
import SelectionComponent from './components/SelectionComponent';
import DragComponent from './components/DragComponent';



export default class SpineObject extends PIXI.Container
{
  constructor(url) {
    super();
    mixin(this, new Entity());

    this.id = url;

    // buffer the animation info
    this.aniBuffer = null;

    this.loader = new PIXI.loaders.Loader();

    this.loaded = false;
    
    //TODO: display place holder loading progress
    InfoLoader.load(url).then(info => {
      this.addComponent(new PlaceHolderComponent(info.dimension));
      this.addComponent(new SelectionComponent(info.dimension));
      this.addComponent(new DragComponent(info.dimension));

      this.loader.add(info.id);
      this.loader.load((loader, resources) => {
        this.spine = new PIXI.spine.Spine(resources[info.id].spineData);
        this.addChild(this.spine);

        if(this.aniBuffer){
          this.spine.state.setAnimation(this.aniBuffer.track, this.aniBuffer.name, this.aniBuffer.loop);
        }

        this.loaded = true;
        this.emit('loaded');
      })
    });

  }

  setAnimation(name, loop=true, track=0) {
    this.aniBuffer = {
      name, loop, track
    };

    if(this.spine) {
      this.spine.state.setAnimation(this.aniBuffer.track, this.aniBuffer.name, this.aniBuffer.loop);
    }
  }

  getAnimations() {
    return new Promise((resolve, reject) => {
      if(this.spine) {
        resolve(this.spine.state.data.skeletonData.animations)
      }
      else {
        this.once('loaded', () => {
          resolve(this.spine.state.data.skeletonData.animations)
        })
      }
    })
  }
}
