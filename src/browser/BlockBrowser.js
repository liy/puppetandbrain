import Browser from "./Browser";
import BlockCollection from './BlockCollection';
import ArrayMap from "../utils/ArrayMap";
import GroupSection from "./GroupSection";
import Block from '../graph/blocks/Block';

export default class BlockBrowser extends Browser
{
  constructor() {
    super();

    this.groups = new ArrayMap();
  }

  getTemplates() {
    // these are dynmaic templates
    let classNames = Object.keys(NodeTemplate).filter(className => {
      return className != 'Getter' && className != 'Setter' && className != 'Perform' && className != 'Break'
    })
  
    return classNames.map(className => {
      NodeTemplate[className].className = className;
      NodeTemplate[className].name = NodeTemplate[className].name || className;
      return NodeTemplate[className];
    })
  }

  open(x, y) {
    super.open();

    return new Promise((resolve, reject) => {
      this.contentSection.element.addEventListener('mousedown', e => {
        this.close();
        resolve();
      })

      let templates = this.getTemplates();

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
      console.log(templates)

      // break position
      templates.push({
        ...NodeTemplate.Break,
        name: `Break Position`,
        // the node going to be created is owned by the current opening brain
        owner: BrainGraph.brain.owner,
        outputs: [{name:'x'},{name:'y'}]
      })

      for(let template of templates) {
        let group = this.getGroup(template.category);
        let block = new Block();
        group.addBlock(block);
        block.template(template);


        block.once('block.chosen', data => {
          this.close();
          
          let command = Commander.create('CreateBlock', data, BrainGraph.brain.owner.id, x, y).processAndSave();
          History.push(command);
          // Make sure there is a block created.
          if(command) {
            resolve(command.getCreatedNode());
          }
          else {
            resolve();
          }
        });

      }
    })
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