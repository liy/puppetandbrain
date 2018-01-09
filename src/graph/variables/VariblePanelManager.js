import DataType from "../../data/DataType";

class VariableManager
{
  constructor() {

  }

  setup(panel) {
    this.panel = panel;
    
    this._selected = null;

    this.variables = BrainGraph.brain.variables;
    for(let name of this.variables.names) {
      let data = this.variables[name];
      switch(data.type) {
        case DataType.ACTOR:
        break;
        case DataType.ARRAY:
        break;
        case DataType.COLOR:
        break;
        case DataType.MAP:
        break;
        case DataType.VEC2:
        break;
      }
    }
  }

  async select(variable) {
    if(this.selected && this.selected != variable) {
      await this.selected.shrink();
    }
    
    this._selected = variable;
    if(!this.selected.expanded) {
      this.selected.expand();
    }
  }

  get selected() {
    return this._selected;
  }

  add(variable) {
    
  }

  remove() {
    this.panel
  }
}

export default new VariableManager();