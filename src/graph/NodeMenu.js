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
    for(let name of Object.keys(pods)) {
      let pod = pods[name];
      let item = document.createElement('div');
      item.className = 'menu-item';
      item.textContent = name;
      this.container.appendChild(item);

      item.addEventListener('click', e => {
        Commander.create('CreateBlock', BrainGraph.brain.owner, pod, e.clientX, e.clientY).process();
        this.destroy();
      });
    }

    BrainGraph.container.addEventListener('mousedown', (e) => {
      if(e.target == BrainGraph.container) this.destroy();
    }, {once: true})
  }

  set x(x) {
    this.container.style.left = x +'px'
  }

  set y(y) {
    this.container.style.top = y +'px'
  }
}