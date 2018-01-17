import Component from './Component'

export default class SpineComponent extends Component
{
  constructor(spineData) {
    super()

    // buffer the animation info
    this.aniBuffer = null;

    this.spine = new PIXI.spine.Spine(spineData);
    this.spine.interactive = true;

    if(this.aniBuffer){
      this.spine.state.setAnimation(this.aniBuffer.track, this.aniBuffer.name, this.aniBuffer.loop);
    }

    this.spine.on('pointerdown', e => {
      this.data = e.data;
      let p = this.data.getLocalPosition(this.spine.parent)
      let offset = {
        x: (this.spine.x - p.x),
        y: (this.spine.y - p.y)
      }
      
      this.entity.mouseDown(p.x, p.y, offset);
    })
  }

  added() {
    Stage.addChild(this.spine);
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

  updateTransform() {
    // I have no idea how to update pixi's matrix... so manual transform here. But it is 
    // probably has better perfomance, since we did not have matrix calculation twice...
    this.spine.x = this.entity.position.x;
    this.spine.y = this.entity.position.y;
    this.spine.rotation = this.entity.rotation;
    this.spine.scale = this.entity.scale;
  }
}