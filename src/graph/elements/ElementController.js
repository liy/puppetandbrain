import DataType from "../../data/DataType";
import ArrayMap from "../../utils/ArrayMap";
import ElementPanel from './ElementPanel';

import PropertyElement from './PropertyElement'
import PositionPropertyElement from './PositionPropertyElement';
import SizePropertyElement from './SizePropertyElement';
import RotationPropertyElement from './RotationPropertyElement';
import GenericPropertyElement from './GenericPropertyElement'
import PanelSeperator from './PanelSeperator';

import GenericElement from './GenericElement';
import ListElement from './ListElement';
import MapElement from './MapElement';
import PositionElement from './PositionElement';
import ColorElement from './ColorElement';
import ActorElement from './ActorElement';
import { nextFrame, svgElement } from "../../utils/utils";

class ElementController
{
  constructor() {}

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

    
    this.brain.variables.on('variable.added', this.add, this)
    this.brain.variables.on('variable.removed', this.remove, this)
  }

  close() {
    this.brain.variables.off('variable.added', this.add, this)
    this.brain.variables.off('variable.removed', this.remove, this)
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

    if(this.selected instanceof PropertyElement) {
      this.panel.binButton.hide();
    }
    else {
      this.panel.binButton.show();
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

    let positionElement = new PositionPropertyElement(actor);
    this.panel.append(positionElement.element);
    this.elements.set('posiiton', positionElement);

    let sizeElement = new SizePropertyElement(actor);
    this.panel.append(sizeElement.element);
    this.elements.set('size', sizeElement);

    let rotationElement = new RotationPropertyElement(actor);
    this.panel.append(rotationElement.element);
    this.elements.set('rotation', rotationElement);

    // extra properties if any
    for(let descriptor of actor.properties) {
      let propertyElement = new GenericPropertyElement(actor, descriptor);
      this.panel.append(propertyElement.element);
      this.elements.set(descriptor.property, propertyElement);
    }

    // seperator
    this.panel.append(new PanelSeperator().element)
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