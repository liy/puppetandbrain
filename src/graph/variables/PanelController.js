import DataType from "../../data/DataType";
import ArrayMap from "../../utils/ArrayMap";

class PanelController
{
  constructor() {

  }

  init(panel) {
    this.panel = panel;
    
    this._selected = null;

    // populated by element constructor
    this.elements = new ArrayMap();
  }

  async select(variable) {
    if(this.selected && this.selected != variable) {
      await this.selected.deselect();
    }
    
    this._selected = variable;
    if(!this.selected.expanded) {
      this.selected.select();
    }
  }

  get selected() {
    return this._selected;
  }

  remove(variable) {
    this.panel.remove(this.elements.get(variable.id));
  }

  add(variable) {
    switch(variable.type) {
      case DataType.ACTOR:
        this.panel.append(new ActorElement(variable)); 
        break;
      case DataType.ARRAY:
        this.panel.append(new ListElement(variable)); 
        break;
      case DataType.COLOR:
        this.panel.append(new ColorElement(variable)); 
        break;
      case DataType.MAP:
        this.panel.append(new MapElement(variable)); 
        break;
      case DataType.VEC2:
        this.panel.append(new PositionElement(variable)); 
        break;
      default:
        this.panel.append(new GenericElement(variable)); 
        break;
    }
  }
}

export default new PanelController();