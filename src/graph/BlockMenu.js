require('./BlockMenu.scss')
import ActionName from '../nodes/ActionName';

const ITEMS = [
  {
    itemName: 'Wait',
    nodePod: {
      className: 'Wait',
      variables: {
        seconds: 1
      }
    }
  },
  {
    itemName: 'Game Start',
    nodePod: {
      className: 'Action',
      actionName: ActionName.GAME_START
    }
  },
  {
    itemName: 'Move',
    nodePod: {
      className: 'Tween'
    }
  },
  {
    itemName: 'Print',
    nodePod: {
      className: 'Trace',
      variables: {
        text: 'Print out a message'
      }
    }
  },
  {
    itemName: 'Animation',
    nodePod: {
      className: 'Animation',
      variables: {
      itemName: 'static',
      }
    }
  },
  {
    itemName: 'Branch',
    nodePod: {
      className: 'Branch',
      variables: {
        condition: true
      }
    }
  },
  {
    itemName: 'Get Position',
    nodePod: {
      className: 'GetPosition',
      name: 'position',
    }
  },
  {
    itemName: 'Get Rotation',
    nodePod: {
      className: 'GetRotation',
      name: 'rotation',
    }
  },

  {
    itemName: '+ Addition',
    nodePod: {
      className: 'Addition',
      variables: {
        A: 1,
        B: 1
      },
    }
  },
  {
    itemName: '/ Divide',
    nodePod: {
      className: 'Divide',
      variables: {
        A: 4,
        B: 2,
      },
    }
  },
  {
    itemName: '* Multiply',
    nodePod: {
      className: 'Multiply',
      variables: {
        A: 2,
        B: 3,
      },
    }
  },
  {
    itemName: '= Equal',
    nodePod: {
      className: 'Equal',
      variables: {
        A: 1,
        B: 1,
      },
    }
  },
  {
    itemName: '<= Less Equal',
    nodePod: {
      className: 'LessEqual',
      variables: {
        A: 1,
        B: 2,
      },
    }
  },
  {
    itemName: '< Less Than',
    nodePod: {
      className: 'LessThan',
      variables: {
        A: 1,
        B: 2,
      },
    }
  },
  {
    itemName: 'Random Number',
    nodePod: {
      className: 'RandomNumber',
    }
  },
  {
    itemName: 'Key Down',
    nodePod: {
      className: 'KeyDown',
      variables: {
        key: 'S'
      }
    }
  },
  {
    itemName: 'Loop',
    nodePod: {
      className: 'Loop',
      variables: {
        limit: 3
      }
    }
  },
  {
    itemName: 'Repeat',
    nodePod: {
      className: 'Repeat',
      variables: {
        times: 3
      }
    }
  },
  {
    itemName: 'Separate Position',
    nodePod: {
      className: 'SeparatePosition',
    }
  },
  {
    itemName: 'Make Position',
    nodePod: {
      className: 'MakePosition',
    }
  }
]

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
      let entries = ITEMS.concat();
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