require('./BlockMenu.scss')
import MenuContent from './MenuContent';


export default class BlockMenu
{
  constructor() {
    this.container = document.createElement('div');
    this.container.setAttribute('id', 'block-menu');

    BrainGraph.container.appendChild(this.container);
  }

  destroy() {
    BrainGraph.container.removeChild(this.container);
  }

  open() {
    // wait until user pick the block to create....
    return new Promise(resolve => {
      let entries = MenuContent.concat();

      // get all actors' actions
      for(let actor of LookUp.getActors()) {
        if(actor == BrainGraph.brain.owner) continue;
        
        for(let actionName of Object.keys(actor.actions)) {
          entries.push({
            itemName: `Perform ${actionName}`,
            nodePod: {
              className: 'Perform',
              owner: BrainGraph.brain.owner,
              target: actor,
              actionID: actor.actions[actionName].id
            }
          })
          
        }
      }

      // Populate all the variable getter and setter for this actor
      let brain = BrainGraph.brain;
      for(let name of Object.keys(brain.variables)) {
        entries.push({
          itemName: `Get ${brain.owner.name} ${name}`,
          nodePod: {
            className: 'Getter',
            // Note that, owner is the node's owner
            owner: BrainGraph.brain.owner,
            targetBrain: brain,
            variableName: name
          }
        })
        entries.push({
          itemName: `Set ${brain.owner.name} ${name}`,
          nodePod: {
            className: 'Setter',
            // Note that, owner is the node's owner
            owner: BrainGraph.brain.owner,
            targetBrain: brain,
            variableName: name
          }
        })
      }

      // TODO: temp sort...
      entries.sort((a, b) => {
        return a.itemName.localeCompare(b.itemName);
      });
  
      for(let entry of entries) {
        let item = document.createElement('div');
        item.className = 'menu-item';
        item.textContent = entry.itemName;
        this.container.appendChild(item);
  
        item.addEventListener('click', e => {
          this.destroy();
          let command = Commander.create('CreateBlock', entry.nodePod, BrainGraph.brain.owner.id, this.x, this.y).processAndSave();
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
  
      BrainGraph.container.addEventListener('mousedown', e => {
        if(e.target.className != 'menu-item') {
          this.destroy();
          resolve();
        }
      }, {once: true})
    })
  }

  set x(x) {
    this.container.style.left = x +'px'
    this._x = x;
  }

  set y(y) {
    this.container.style.top = y +'px'
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}