import ArrayMap from './utils/ArrayMap'
import ActorSelection from './objects/ActorSelection';

export default class Stage
{
  constructor() {
    this.actors = new ArrayMap();

    this.container = new PIXI.Container();
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
    catcher.on('mousedown', ActorSelection.deselectAll.bind(ActorSelection));
  }

  updateTransform() {
    for(let actor of this.actors) {
      actor.updateTransform();
    }
  }

  addActor(actor) {
    this.actors.set(actor.id, actor);
  }

  removeActor(actor) {
    this.actors.remove(actor.id);
  }

  addChild(child) {
    return this.container.addChild(child);
  }

  removeChild(child) {
    return this.container.removeChild(child);
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
}