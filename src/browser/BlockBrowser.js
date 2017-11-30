import Browser from "./Browser";
import BlockCollection from './BlockCollection';
import ArrayMap from "../utils/ArrayMap";
import GroupSection from "./GroupSection";
import DummyBlock from "./DummyBlock";

export default class BlockBrowser extends Browser
{
  constructor() {
    super();

    this.groups = new ArrayMap();
  }

  open(x, y) {
    super.open();

    return new Promise((resolve, reject) => {
      this.contentSection.element.addEventListener('mousedown', e => {
        this.close();
        resolve();
      })

      let collecion = BlockCollection.concat();

      for(let actor of LookUp.getActors()) {
        if(actor == BrainGraph.brain.owner) continue;
        
        for(let actionName of Object.keys(actor.actions)) {
          let action = actor.actions[actionName];
          console.log(action)
          collecion.push({
            name: `Perform ${actionName}`,
            category: 'Action',
            pod: {
              className: 'Perform',
              owner: BrainGraph.brain.owner,
              target: actor,
              actionID: actor.actions[actionName].id
            },
            in: false,
            out: ['default'],
            outputs: [],
            inputs: action.outputs.names,
            minWidth: 120,
          })
          
        }
      }

      for(let info of collecion) {
        let group = this.getGroup(info.category);
        let block = new DummyBlock(info);
        group.addBlock(block);

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