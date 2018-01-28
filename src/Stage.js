import ArrayMap from './utils/ArrayMap'
import ActorSelection from './objects/ActorSelection';

export default class Stage
{
  constructor() {
    this.element = document.getElementById('stage');
    console.log(this.element.offsetLeft)
    console.log(this.element.offsetTop)

    this.actors = new ArrayMap();

    this.container = new PIXI.Container();

    this.backStage = [];
  }

  init(width, height) {
    this.stageWidth = width;
    this.stageHeight = height;


    // For deselection
    let catcher = new PIXI.Graphics();
    catcher.interactive = true;
    catcher.beginFill(0, 0);
    catcher.drawRect(0, 0, width, height);
    catcher.endFill();
    this.addChild(catcher);
    catcher.on('mousedown', ActorSelection.deselectAll, ActorSelection);
  }

  updateTransform() {
    for(let actor of this.actors) {
      actor.updateTransform();
    }
  }

  addActor(actor) {
    // call update transform immeditately
    // so it is up to date with the transform even without waiting
    // for the next updateTransform() call
    actor.updateTransform();
    this.actors.set(actor.id, actor);
    actor.onStage();
  }

  removeActor(actor) {
    this.actors.remove(actor.id);
    actor.offStage();
  }

  addChild(child) {
    return this.container.addChild(child);
  }

  removeChild(child) {
    return this.container.removeChild(child);
  }

  clear() {
    console.log(this.actors)
    for(let actor of this.actors) {
      actor.destroy();
    }
  }

  set blurEnabled(v) {
    if(v) {
      this.container.filters = [new PIXI.filters.BlurFilter(2, 1)];
      document.getElementById('stage-overlayer').classList.add('blur');
    }
    else {
      this.container.filters = [];
      document.getElementById('stage-overlayer').classList.remove('blur');
    }
  }

  get offsetX() {
    return this.element.offsetLeft
  }

  get offsetY() {
    return this.element.offsetTop
  }
}