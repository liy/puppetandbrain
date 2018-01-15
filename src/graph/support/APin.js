export default class APin
{
  /**
   * 
   * @param {identifier of the data field} name Its main purpose is identify the pin. e.g., SetterBlock will pass
   * property id, and manually override the label content to be the property name. As user can change variable name on the fly. 
   * @param {*} flow 
   */
  constructor(name, flow) {
    // Note it might be an brain property ID instead of the node memory name.
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