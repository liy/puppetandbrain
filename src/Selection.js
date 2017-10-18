// TODO: to be simplified
/**
 * Hold selection state
 * 
 * @class Selection
 */
class Selection
{
  constructor() {
    this.selected = [];

  }

  init(stage) {
    this.stage = stage;

    let catcher = new PIXI.Graphics();
    catcher.interactive = true;
    catcher.beginFill(0, 0);
    catcher.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
    catcher.endFill();
    this.stage.addChild(catcher);

    this.deselectAll = this.deselectAll.bind(this);
    catcher.on('mousedown', this.deselectAll);
  }

  add(target) {
    this.selected.push(target);
  }

  remove(target) {
    let i = this.selected.indexOf(target);
    if(i != -1) {
      this.selected.splice(i, 1);
    }
  }

  set(target) {
    this.deselectAll();
    this.selected = [target];
  }

  deselectAll() {
    this.selected.forEach(entity => {
      entity.getComponent('SelectionComponent').deselect(entity)
    })
  }
}

export default new Selection();