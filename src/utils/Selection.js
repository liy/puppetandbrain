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