import DataType from "../../data/DataType";
import ArrayMap from "../../utils/ArrayMap";
import AVariablePanel from './AVariablePanel';

import GenericElement from './GenericElement';
import ListElement from './ListElement';
import MapElement from './MapElement';
import PositionElement from './PositionElement';
import ColorElement from './ColorElement';
import ActorElement from './ActorElement';

class VariablePanelController
{
  constructor() {
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  init() {
    this.panel = new AVariablePanel();
  }
  
  open(brain) {
    this._selected = null;

    this.brain = brain;

    this.elements = new ArrayMap();

    for(let variable of this.brain.variables) {
      this.add(variable);
    }
    
    this.brain.variables.on('variable.added', this.add)
    this.brain.variables.on('variable.removed', this.remove)
  }

  close() {
    this.brain.variables.off('variable.added', this.add)
    this.brain.variables.off('variable.removed', this.remove)
    this.panel.clear();
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

  add(variable) {
    let variableElement = null;
    switch(variable.type) {
      case DataType.ACTOR:
        new ActorElement(variable); 
        break;
      case DataType.ARRAY:
        variableElement = new ListElement(variable); 
        break;
      case DataType.COLOR:
        variableElement = new ColorElement(variable); 
        break;
      case DataType.MAP:
        variableElement = new MapElement(variable); 
        break;
      case DataType.VEC2:
        variableElement = new PositionElement(variable); 
        break;
      default:
        variableElement = new GenericElement(variable); 
        break;
    }
    this.panel.append(variableElement.element);
    this.elements.set(variable.id, variableElement);
  }

  remove(variable) {
    this.panel.remove(this.elements.get(variable.id).element);
  }
}

export default new VariablePanelController();