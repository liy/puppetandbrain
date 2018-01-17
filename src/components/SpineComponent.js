import ContainerComponent from './ContainerComponent';

export default class SpineComponent extends ContainerComponent
{
  constructor(spineData) {
    super()

    // buffer the animation info
    this.aniBuffer = null;

    this.spine = new PIXI.spine.Spine(spineData);
    this.spine.interactive = true;
    this.container.addChild(this.spine);

    if(this.aniBuffer){
      this.spine.state.setAnimation(this.aniBuffer.track, this.aniBuffer.name, this.aniBuffer.loop);
    }

    // this.spine.on('pointerdown', e => {
    //   this.data = e.data;
    //   let p = this.data.getLocalPosition(this.spine.parent)
    //   let offset = {
    //     x: (this.spine.x - p.x),
    //     y: (this.spine.y - p.y)
    //   }
      
    //   this.entity.mouseDown(p.x, p.y, offset);
    // })
  }

  setToSetupPose() {
    this.spine.state.tracks = [];
    this.spine.skeleton.setToSetupPose();
  }

  get state() {
    return this.spine.state;
  }

  setAnimation(name, loop=true, track=0) {
    this.aniBuffer = {
      name, loop, track
    };

    if(this.spine) {
      this.spine.state.setAnimation(this.aniBuffer.track, this.aniBuffer.name, this.aniBuffer.loop)
    }
  }

  getAnimations() {
    return this.spine.state.data.skeletonData.animations
  }
}