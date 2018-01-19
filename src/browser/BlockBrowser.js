import Fuse from 'fuse.js'

import Browser from "./Browser";
import ArrayMap from "../utils/ArrayMap";
import GroupSection from "./GroupSection";
import Block from '../graph/blocks/Block';
import DataType from '../data/DataType';

// FIXME: clean up needed!!
export default class BlockBrowser extends Browser
{
  constructor() {
    super();

    this.onSelect = this.onSelect.bind(this);

    this.groups = new ArrayMap();

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
    let template = this.filteredTemplates[0];
    if(!template) return;

    let command = Commander.create('CreateBlock', template, BrainGraph.brain.owner.id, this.targetX, this.targetY).processAndSave();
    History.push(command);
    // Make sure there is a block created.
    if(command) {
      this.resolve(command.getCreatedNode());
    }
    else {
      this.resolve();
    }
    this.close();
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
          owner: BrainGraph.brain.owner.id,
          target: actor.id,
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
        name: `Get ${variable.name}`,
        owner: BrainGraph.brain.owner.id,
        targetBrain: BrainGraph.brain.id,
        variableID: variable.id,
      })
      templates.push({
        ...NodeTemplate.Setter,
        name: `Set ${variable.name}`,
        owner: BrainGraph.brain.owner.id,
        targetBrain: BrainGraph.brain.id,
        variableID: variable.id,
      })
    }

    // break position block
    templates.push({
      ...NodeTemplate.Break,
      name: `Break Position`,
      // the node going to be created is owned by the current opening brain
      owner: BrainGraph.brain.owner.id,
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
        name: `Get ${descriptor.property}`,
        owner: BrainGraph.brain.owner.id,
        property: descriptor.property,
        outputs: [{
          name: descriptor.property,
          type: descriptor.type || DataType.GENERIC
        }]
      })
      templates.push({
        ...NodeTemplate.PropertySetter,
        name: `Set ${descriptor.property}`,
        owner: BrainGraph.brain.owner.id,
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

  open(x, y) {
    super.open();

    this.targetX = x;
    this.targetY = y;

    this.blocks = [];
    this.templates = this.getTemplates();
    this.fuse = new Fuse(this.templates, this.searchOptions);

    this.refresh(this.templates);

    return new Promise((resolve, reject) => {
      this.resolve = resolve;

      this.contentSection.element.addEventListener('mousedown', e => {
        this.close();
        this.resolve();
      })
    })
  }

  refresh(tempaltes) {
    this.clear();

    for(let template of tempaltes) {
      let group = this.getGroup(template.category);
      let block = BlockFactory.createTemplateBlock(template)
      group.addBlock(block);
      block.template(template);

      this.blocks.push(block);

      block.once('block.chosen', this.onSelect);
    }
  }

  onSelect(data) {
    let command = Commander.create('CreateBlock', data, BrainGraph.brain.owner.id, this.targetX, this.targetY).processAndSave();
    History.push(command);
    // Make sure there is a block created.
    if(command) {
      this.resolve(command.getCreatedNode());
    }
    else {
      this.resolve();
    }
  }

  clear() {
    for(let block of this.blocks) {
      block.off('block.chosen', this.onSelect);
    }
    this.contentSection.clear();
    this.groups.clear();
    this.blocks = [];
  }

  getGroup(name) {
    let group = this.groups.get(name);
    if(!group) {
      group = new GroupSection(name);
      this.groups.set(name, group);
      this.contentSection.addGroup(group);
    }
    return group;
  }
}