import DataType from "../../data/DataType";
import ArrayMap from "../../utils/ArrayMap";
import ElementPanel from './ElementPanel';

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
import AudioElement from './AudioElement';
import { nextFrame, svgElement } from "../../utils/utils";
import GraphSelection from "../GraphSelection";
import ImagePropertyElement from "./ImagePropertyElement";

class ElementController
{
  constructor() {}

  init() {
    this.panel = new ElementPanel();
  }
  
  open(brain) {
    this.brain = brain;

    this.elements = new ArrayMap();

    this.addProperties();

    for(let variable of this.brain.variables) {
      this.addVariable(variable, false);
    }

    
    this.brain.variables.on('variable.added', this.addVariable, this)
    this.brain.variables.on('variable.removed', this.remove, this)
  }

  close() {
    this.brain.variables.off('variable.added', this.addVariable, this)
    this.brain.variables.off('variable.removed', this.remove, this)
    this.panel.clear();
  }

  addVariable(variable, autoSelect=true) {
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
      case DataType.AUDIO:
        variableElement = new AudioElement(variable); 
        break;
      default:
        variableElement = new GenericElement(variable); 
        break;
    }
    this.panel.append(variableElement.element);
    this.elements.set(variable.id, variableElement);

    if(autoSelect) {
      GraphSelection.select(variableElement);
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
    for(let property of actor.properties) {
      let propertyElement
      if(property.descriptor.type == DataType.IMAGE) {
        propertyElement = new ImagePropertyElement(actor, property);
      }
      else {
        propertyElement = new GenericPropertyElement(actor, property);
      }
      this.panel.append(propertyElement.element);
      this.elements.set(property.propertyName, propertyElement);
    }

    // seperator
    this.panel.append(new PanelSeperator().element)
  }

  remove({variable, index}) {
    this.panel.remove(this.elements.get(variable.id).element);
    this.elements.remove(variable.id)
  }

  refresh() {
    this.panel.clear();

    this.addProperties();

    for(let variable of this.brain.variables) {
      this.addVariable(variable);
    }
  }
}

export default new ElementController();