require('./NodeMenu.scss')

export default class NodeMenu
{
  constructor(graph) {
    this.graph = graph;
    this.container = document.createElement('div');
    this.container.setAttribute('id', 'node-menu');

    this.graph.container.appendChild(this.container);
  }

  destroy() {
    this.graph.container.removeChild(this.container);
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
        this.graph.createBlock(pod, e.clientX, e.clientY);
        this.destroy();
      });
    }

    this.graph.container.addEventListener('mousedown', (e) => {
      if(e.target == this.graph.container) this.destroy();
    }, {once: true})
  }

  set x(x) {
    this.container.style.left = x +'px'
  }

  set y(y) {
    this.container.style.top = y +'px'
  }
}