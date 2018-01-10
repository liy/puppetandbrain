import DataType from "../../data/DataType";
import ArrayMap from "../../utils/ArrayMap";
import AVariablePanel from './AVariablePanel';

import GenericElement from './GenericElement';
import ListElement from './ListElement';
import MapElement from './MapElement';
import PositionElement from './PositionElement';
import ColorElement from './ColorElement';
import ActorElement from './ActorElement';

class PanelController
{
  constructor() {
    this.add = this.add.bind(this);
  }

  init() {
    this.panel = new AVariablePanel();
  }
  
  open(brain) {
    this._selected = null;

    this.brain = brain;

    // populated by element constructor
    // this.elements = new ArrayMap();

    for(let variable of this.brain.variables) {
      this.add(variable);
    }
    
    this.brain.variables.on('variable.added', this.add)
  }

  close() {
    this.brain.variables.off('variable.added', this.add)
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

  clear() {
    this.panel.clear();
  }

  add(variable) {
    switch(variable.type) {
      case DataType.ACTOR:
        this.panel.append(new ActorElement(variable).element); 
        break;
      case DataType.ARRAY:
        this.panel.append(new ListElement(variable).element); 
        break;
      case DataType.COLOR:
        this.panel.append(new ColorElement(variable).element); 
        break;
      case DataType.MAP:
        this.panel.append(new MapElement(variable).element); 
        break;
      case DataType.VEC2:
        this.panel.append(new PositionElement(variable).element); 
        break;
      default:
        this.panel.append(new GenericElement(variable).element); 
        break;
    }
  }
}

export default new PanelController();