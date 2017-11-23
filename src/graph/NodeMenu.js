require('./NodeMenu.scss')

export default class NodeMenu
{
  constructor() {
    this.container = document.createElement('div');
    this.container.setAttribute('id', 'node-menu');

    BrainGraph.container.appendChild(this.container);
  }

  destroy() {
    BrainGraph.container.removeChild(this.container);
  }

  init() {
    let pods = NodeFactory.getNodePods();

    // get all actors' actions
    for(let actor of LookUp.getActors()) {
      for(let actionName of Object.keys(actor.actions)) {
        pods[actionName] = {
          className: 'Perform',
          owner: BrainGraph.brain.owner,
          target: actor,
          actionName: actionName
        }
      }
    }

    for(let name of Object.keys(pods)) {
      let pod = pods[name];
      let item = document.createElement('div');
      item.className = 'menu-item';
      item.textContent = name;
      this.container.appendChild(item);

      item.addEventListener('click', e => {
        History.push(Commander.create('CreateBlock', BrainGraph.brain.owner, pod, this.x, this.y).process());
        this.destroy();
      });
    }

    BrainGraph.container.addEventListener('mousedown', e => {
      if(e.target.className != 'menu-item') this.destroy();
    }, {once: true})
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