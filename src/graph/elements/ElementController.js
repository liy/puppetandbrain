import DataType from "../../data/DataType";
import ArrayMap from "../../utils/ArrayMap";
import ElementPanel from './ElementPanel';

import PositionPropertyElement from './PositionPropertyElement';
import SizePropertyElement from './SizePropertyElement';
import RotationPropertyElement from './RotationPropertyElement';

import GenericElement from './GenericElement';
import ListElement from './ListElement';
import MapElement from './MapElement';
import PositionElement from './PositionElement';
import ColorElement from './ColorElement';
import ActorElement from './ActorElement';
import { nextFrame } from "../../utils/utils";

class ElementController
{
  constructor() {
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  init() {
    this.panel = new ElementPanel();
  }
  
  open(brain) {
    this._selected = null;

    this.brain = brain;

    this.elements = new ArrayMap();

    this.addProperties();

    for(let variable of this.brain.variables) {
      this.add(variable, false);
    }

    
    this.brain.variables.on('variable.added', this.add)
    this.brain.variables.on('variable.removed', this.remove)
  }

  close() {
    this.brain.variables.off('variable.added', this.add)
    this.brain.variables.off('variable.removed', this.remove)
    this.panel.clear();
  }

  async select(variableElement) {
    if(this.selected && this.selected != variableElement) {
      await this.selected.deselect();
    }
    
    this._selected = variableElement;
    if(!this.selected.expanded) {
      this.selected.select();
    }
  }

  get selected() {
    return this._selected;
  }

  add(variable, autoSelect=true) {
    let variableElement = null;
    switch(variable.type) {
      case DataType.ACTOR:
        variableElement = new ActorElement(variable); 
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

    if(autoSelect) {
      this.select(variableElement);
      nextFrame().then(() => {
        variableElement.focus();
      });
    }
  }

  addProperties() {
    let actor = this.brain.owner;

    let positionElement = new PositionPropertyElement(this.brain.owner);
    this.panel.append(positionElement.element);
    this.elements.set('posiiton', positionElement);

    let sizeElement = new SizePropertyElement(this.brain.owner);
    this.panel.append(sizeElement.element);
    this.elements.set('size', sizeElement);

    let rotationElement = new RotationPropertyElement(this.brain.owner);
    this.panel.append(rotationElement.element);
    this.elements.set('rotation', rotationElement);
  }

  remove({variable, index}) {
    this.panel.remove(this.elements.get(variable.id).element);
    this.elements.remove(variable.id)
    
    let previous = this.elements.getAt(Math.max(index-1, 0));
    if(previous) this.select(previous)
  }

  refresh() {
    this.panel.clear();

    this.addProperties();

    for(let variable of this.brain.variables) {
      this.add(variable);
    }
  }
}

export default new ElementController();