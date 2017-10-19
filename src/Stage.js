import Selection from './Selection';

class Stage extends PIXI.Container
{
  constructor() {
    super();

    this.entities = {};
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

  addChild(entity) {
    if(entity.id) this.entities[entity.id] = entity;
    super.addChild(entity);
  }

  removeChild(entity) {
    super.removeChild(entity);
    if(entity.id) delete this.entities[entity.id];
  }

  removeChildAt(index) {
    let entity = super.removeChildAt(index);
    if(entity.id) delete this.entities[entity.id];
  }
}

export default new Stage();