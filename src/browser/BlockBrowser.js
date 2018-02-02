import Fuse from 'fuse.js'

import Browser from "./Browser";
import ArrayMap from "../utils/ArrayMap";
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
    // TODO: to be removed
    // just in case I fogot add className and name...
    let templates = Object.keys(NodeTemplate).map(className => {
      NodeTemplate[className].className = className;
      NodeTemplate[className].name = NodeTemplate[className].name || className;

      return NodeTemplate[className];
    })

    // these are dynmaic templates
    templates = templates.filter(template => {
      return template.className != 'Getter' && template.className != 'Setter' && 
             template.className != 'PropertyGetter' && template.className != 'PropertySetter' && 
             template.className != 'Perform' && template.className != 'Break';
    })

    // Make sure template does not have circular reference. I've changed all references into id.
    // Because fuse.js:
    //  this._log('\n\nOutput:\n\n', JSON.stringify(results));
    // will cause circular issue.
    // It is stupid to have a log statement to break the whole search library

    // Populate the performs
    for(const actor of LookUp.getActors()) {
      for(let actionName of Object.keys(actor.brain.actions)) {
        let action = actor.brain.actions[actionName];
        templates.push({
          ...NodeTemplate.Perform,
          name: `Perform ${actionName}`,
          // the node going to be created is owned by the current opening brain
          ownerID: BrainGraph.brain.owner.id,
          actionID: actor.brain.actions[actionName].id,
          inputs: action.outputs.names.map(name => {
            return {name}
          }),
        })
      }
    }

    // Populate all the variable getter and setter for this actor
    for(let variable of BrainGraph.brain.variables) {
      templates.push({
        ...NodeTemplate.Getter,
        name: `${variable.name}`,
        ownerID: BrainGraph.brain.owner.id,
        variableID: variable.id,
      })
      templates.push({
        ...NodeTemplate.Setter,
        name: `Set ${variable.name}`,
        ownerID: BrainGraph.brain.owner.id,
        variableID: variable.id,
      })
    }

    // break position block
    templates.push({
      ...NodeTemplate.Break,
      name: `Break Position`,
      // the node going to be created is owned by the current opening brain
      ownerID: BrainGraph.brain.owner.id,
      inputName: 'position',
      inputs: [{
        name: 'position',
        type: DataType.VEC2,
      }],
      outputs: [{name:'x'},{name:'y'}],
      memory: {
        position: {x:0,y:0}
      }
    })

    // actor properties
    let actor = BrainGraph.brain.owner;
    for(let descriptor of actor.properties) {
      templates.push({
        ...NodeTemplate.PropertyGetter,
        name: `${descriptor.property}`,
        ownerID: BrainGraph.brain.owner.id,
        property: descriptor.property,
        outputs: [{
          name: descriptor.property,
          type: descriptor.type || DataType.GENERIC
        }]
      })
      templates.push({
        ...NodeTemplate.PropertySetter,
        name: `Set ${descriptor.property}`,
        ownerID: BrainGraph.brain.owner.id,
        property: descriptor.property,
        inputs: [{
          name: descriptor.property,
          type: descriptor.type || DataType.GENERIC
        }],
        outputs: [{
          name: descriptor.property,
          type: descriptor.type || DataType.GENERIC
        }]
      })
    }

  
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