export default class APin
{
  constructor(name, flow) {
    this.name = name;
    this.flow = flow;
    
    this.element = document.createElement('div');

    this.label = document.createElement('span');
    this.label.className = 'label';
    this.label.textContent =  (name == 'default') ? '' : name;
    this.element.appendChild(this.label);
  }

  init(node) {
    this.node = node;
  }
}