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

  open(autoConnect) {
    // wait until user pick the block to create....
    return new Promise(resolve => {
      let entries = MenuContent.concat();
      // get all actors' actions
      for(let actor of LookUp.getActors()) {
        if(actor == BrainGraph.brain.owner) continue;
        
        for(let actionName of Object.keys(actor.customActions)) {
          entries.push({
            itemName: `Perform ${actionName}`,
            nodePod: {
              className: 'Perform',
              owner: BrainGraph.brain.owner,
              target: actor,
              actionName: actionName
            }
          })
          
        }
      }
  
      for(let entry of entries) {
        let item = document.createElement('div');
        item.className = 'menu-item';
        item.textContent = entry.itemName;
        this.container.appendChild(item);
  
        item.addEventListener('click', e => {
          History.push(Commander.create('CreateBlock', entry.nodePod, BrainGraph.brain.owner.id, this.x, this.y, autoConnect).process());
          this.destroy();
          resolve();
        });
      }
  
      BrainGraph.container.addEventListener('mousedown', e => {
        if(e.target.className != 'menu-item') this.destroy();
        resolve();
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