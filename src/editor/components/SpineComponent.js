import ContainerComponent from './ContainerComponent';

export default class SpineComponent extends ContainerComponent
{
  constructor(spineData) {
    super()

    this.spine = new PIXI.spine.Spine(spineData);
    this.spine.interactive = true;
    this.container.addChild(this.spine);
  }

  stopAnimations() {
    this.spine.state.clearTracks();
    this.spine.skeleton.setToSetupPose();
  }

  get state() {
    return this.spine.state;
  }

  playAnimation(name, track=0, loop=true) {
    this.spine.state.setAnimation(track, name, loop)
  }

  getAnimations() {
    return this.spine.state.data.skeletonData.animations
  }
}