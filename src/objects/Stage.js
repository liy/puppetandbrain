import Selection from '../utils/Selection';

class Stage extends PIXI.Container
{
  constructor() {
    super();
    this.actors = [];
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
    catcher.on('mousedown', Selection.deselectAll.bind(Selection));
  }

  addActor(actor) {
    this.addChild(actor);
    this.actors.push(actor.id);
  }

  removeActor(actor) {
    this.removeChild(actor)
    let index = this.actors.indexOf(actor.id);
    if(index != -1) this.actors.splice(index);
  }

  removeActorAt(index) {
    let id = super.removeChildAt(index);
    if(id) {
      this.actors.splice(index);
    }
  }

  set blurEnabled(v) {
    this.filters = v ? [new PIXI.filters.BlurFilter(2, 1)] : [];
  }
}

export default new Stage();