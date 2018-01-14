import Fuse from 'fuse.js'

import Browser from "./Browser";
import BlockCollection from './BlockCollection';
import ArrayMap from "../utils/ArrayMap";
import GroupSection from "./GroupSection";
import Block from '../graph/blocks/Block';


export default class BlockBrowser extends Browser
{
  constructor() {
    super();

    this.onSelect = this.onSelect.bind(this);

    this.groups = new ArrayMap();

    this.searchOptions = {
      // id: 'className',
      keys: ['_name', 'keywords', '_category'] 
    }

    this.fuse = null;
  }

  onSearch(e) {
    let templates = null;
    let terms = (e.target.value).trim();
    if(terms === '') {
      templates = this.templates;
    }
    else {
      templates = this.fuse.search(e.target.value);
    }
    this.refresh(templates);
  }

  getTemplates() {
    // these are dynmaic templates
    let classNames = Object.keys(NodeTemplate).filter(className => {
      return className != 'Getter' && className != 'Setter' && className != 'Perform' && className != 'Break'
    })

    let templates = classNames.map(className => {
      NodeTemplate[className].className = className;
      NodeTemplate[className].name = NodeTemplate[className].name || className;

      // FIXME: use _ prefix name and category.
      // not sure why fuse.js does not like name and category fields.
      // probably a bug in their library
      NodeTemplate[className]._name = NodeTemplate[className].name;
      NodeTemplate[className]._category = NodeTemplate[className].category;

      return NodeTemplate[className];
    })


    // Populate the performs
    for(const actor of LookUp.getActors()) {
      // if(actor == BrainGraph.brain.owner) continue;
      
      for(let actionName of Object.keys(actor.actions)) {
        let action = actor.actions[actionName];
        templates.push({
          ...NodeTemplate.Perform,
          name: `Perform ${actionName}`,
          // the node going to be created is owned by the current opening brain
          owner: BrainGraph.brain.owner,
          target: actor,
          actionID: actor.actions[actionName].id,
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
        name: `Get ${BrainGraph.brain.owner.name} ${variable.name}`,
        // Note that, owner is the node's owner
        owner: BrainGraph.brain.owner,
        targetBrain: BrainGraph.brain,
        variableID: variable.id,
        inputs: [],
        outputs: [{
          name: variable.name,
        }],
      })
      templates.push({
        ...NodeTemplate.Setter,
        name: `Set ${BrainGraph.brain.owner.name} ${variable.name}`,
        // Note that, owner is the node's owner
        owner: BrainGraph.brain.owner,
        targetBrain: BrainGraph.brain,
        variableID: variable.id,
        inputs: [{
          name: variable.name
        }],
        outputs: [{
          name: variable.name
        }],
      })
    }

    // break position
    templates.push({
      ...NodeTemplate.Break,
      name: `Break Position`,
      // the node going to be created is owned by the current opening brain
      owner: BrainGraph.brain.owner,
      outputs: [{name:'x'},{name:'y'}]
    })
  
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
        resolve();
      })
    })
  }

  refresh(templates) {
    this.clear();

    for(let template of templates) {
      let group = this.getGroup(template.category);
      let block = new Block();
      group.addBlock(block);
      block.template(template);

      this.blocks.push(block);

      block.once('block.chosen', this.onSelect);
    }
  }

  onSelect(data) {
    this.close();
    
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