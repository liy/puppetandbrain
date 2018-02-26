import Fuse from 'fuse.js'

import Browser from "./Browser";
import ArrayMap from "@/utils/ArrayMap";
import GroupSection from "./GroupSection";
import DataType from '../data/DataType';
import BlockBox from './BlockBox';

// FIXME: clean up needed!!
export default class BlockBrowser extends Browser
{
  constructor() {
    super();

    this.searchOptions = {
      // id: 'className',
      shouldSort: true,
      threshold: 0.2,
      keys: [{
        name: 'category', weight: 0.05
      }, {
        name: 'keywords', weight: 0.05
      }, {
        name: 'name', weight: 0.9  
      }] 
    }

    this.fuse = null;
  }

  onSearch(e) {
    if((e.target.value).trim() === '') {
      this.filteredTemplates = this.templates;
    }
    else {
      this.filteredTemplates = this.fuse.search(e.target.value);
    }
    this.refresh(this.filteredTemplates);
    this.contentSection.resetScroll();
  }

  quickSelect() {
    // only allow quick selection when filtered number of results are small enough
    if(this.filteredTemplates && this.filteredTemplates.length < 15) {
      let template = this.filteredTemplates[0];
      if(!template) return;

      template.x = template.x || window.innerWidth/2;
      template.y = template.y || window.innerHeight/2;

      this.close(template);
    } 
  }

  getTemplates() {
    // these are dynmaic templates
    let templates = []
    Object.keys(NodeTemplate).map(className => {
      if(className != 'VariableGetter' && className != 'VariableSetter' && className != 'PropertyGetter' && className != 'PropertySetter' && 
         className != 'Perform' && className != 'Break') {
        templates.push(NodeTemplate[className])
      }
    })

    // Make sure template does not have circular reference. I've changed all references into id.
    // Because fuse.js:
    //  this._log('\n\nOutput:\n\n', JSON.stringify(results));
    // will cause circular issue.
    // It is stupid to have a log statement to break the whole search library

    // Populate the performs
    for(const actor of ActivityManager.current.lookUp.getActors()) {
      for(let actionName of Object.keys(actor.brain.actions)) {
        let action = actor.brain.actions[actionName];
        templates.push({
          ...NodeTemplate.Perform,
          name: `${action.owner.name} Perform ${actionName}`,
          // the node going to be created is owned by the current opening brain
          ownerID: BrainGraph.brain.owner.id,
          actionID: actor.brain.actions[actionName].id,
          // create input and its descriptor from the action's outputs
          inputs: action.outputs.map((name, output) => {
            return {
              name,
              descriptor: output.descriptor
            }
          }),
        })
      }
    }

    // Populate all the variable getter and setter for this actor
    for(let variable of BrainGraph.brain.variables) {
      templates.push({
        ...NodeTemplate.VariableGetter,
        name: `${variable.name}`,
        ownerID: BrainGraph.brain.owner.id,
        variableID: variable.id,
      })
      templates.push({
        ...NodeTemplate.VariableSetter,
        name: `Set ${variable.name}`,
        ownerID: BrainGraph.brain.owner.id,
        variableID: variable.id,
      })
    }

    // make position version of MakeVector
    templates.push({
      ...NodeTemplate.MakeVector,
      name: 'Make Position',
      // the node going to be created is owned by the current opening brain
      ownerID: BrainGraph.brain.owner.id,
      outputName: 'position',
      outputs: [{
        name: 'position',
        descriptor: {
          type: DataType.VEC2,
        }
      }],
      keywords: [...NodeTemplate.MakeVector.keywords, 'position']
    })

    // break position block
    templates.push({
      ...NodeTemplate.Break,
      name: `Break Position`,
      // the node going to be created is owned by the current opening brain
      ownerID: BrainGraph.brain.owner.id,
      inputName: 'position',
      inputs: [{
        name: 'position',
        descriptor: {
          type: DataType.VEC2,
          gadgetClassName: 'PositionField'
        }
      }],
      outputs: [{
        name:'x',
        descriptor: {
          type: DataType.DOUBLE
        }
      },{
        name:'y',
        descriptor: {
          type: DataType.DOUBLE
        }
      }],
      memory: {
        position: {x:0,y:0}
      }
    })

    templates.push({
      ...NodeTemplate.Break,
      name: `Break Vector`,
      // the node going to be created is owned by the current opening brain
      ownerID: BrainGraph.brain.owner.id,
      inputName: 'vector',
      inputs: [{
        name: 'vector',
        descriptor: {
          type: DataType.VEC2,
          gadgetClassName: 'Vec2Field'
        }
      }],
      outputs: [{
        name:'x',
        descriptor: {
          type: DataType.DOUBLE
        }
      },{
        name:'y',
        descriptor: {
          type: DataType.DOUBLE
        }
      }],
      memory: {
        vector: {x:0,y:0}
      }
    })

    // actor properties
    let actor = BrainGraph.brain.owner;
    actor.properties.map((propertyName, property) => {
      templates.push({
        ...NodeTemplate.PropertyGetter,
        name: `${property.descriptor.friendlyName}`,
        ownerID: BrainGraph.brain.owner.id,
        propertyName,
        outputs: [{
          name: propertyName,
          descriptor: property.descriptor
        }]
      })
      templates.push({
        ...NodeTemplate.PropertySetter,
        name: `Set ${property.descriptor.friendlyName}`,
        ownerID: BrainGraph.brain.owner.id,
        propertyName,
        inputs: [{
          name: propertyName,
          descriptor: property.descriptor
        }],
        outputs: [{
          name: propertyName,
          descriptor: property.descriptor
        }]
      })
    })

    templates.sort((a, b) => {
      return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    })

    return templates;
  }

  process() {
    this.filteredTemplates = this.templates = this.getTemplates();
    this.fuse = new Fuse(this.templates, this.searchOptions);

    this.refresh(this.templates);
  }

  refresh(tempaltes) {
    this.clear();

    for(let template of tempaltes) {
      let box = new BlockBox(template);
      this.add(box, template.category);
      box.on('browser.close', this.close, this);
    }
  }
}