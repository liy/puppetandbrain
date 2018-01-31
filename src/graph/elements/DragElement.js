import './DragElement.scss'
import ElementController from './ElementController';
import DataType from '../../data/DataType';
import GraphSelection from '../GraphSelection';

export default class {
  constructor(sourceElement) {
    this.sourceElement = sourceElement;

    this.element = document.createElement('div');
    this.element.className = 'base-element drag-element';
    
    this.icon = document.createElement('div');
    this.element.appendChild(this.icon);
    this.icon.className = 'element-icon';
    let icon = this.sourceElement.createIcon();
    if(typeof icon == 'string') {
      this.icon.textContent = icon;
    }
    else {
      this.icon.appendChild(icon);
    }

    this.nameSpan = document.createElement('span');
    this.nameSpan.textContent = this.sourceElement.name;
    this.element.appendChild(this.nameSpan)
    
    this.dragMove = this.dragMove.bind(this);
    this.dragStop = this.dragStop.bind(this);
  }

  destroy() {
    document.body.removeChild(this.element);
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.dragStop);

    GraphSelection.deselect();
  }

  select() {
    this.selected = true;
    this.element.classList.add('element-selected');
  }

  deselect() {
    this.selected = false;
    this.element.classList.remove('element-selected');
  }

  moveTo(x, y) {
    this.element.style.transform = `translate(${x}px, ${y}px)`;
  }

  dragStart(e) {
    document.body.appendChild(this.element);
    this.moveTo(e.clientX, e.clientY);

    document.addEventListener('mousemove', this.dragMove);
    document.addEventListener('mouseup', this.dragStop);

    GraphSelection.select(this);
  }

  dragMove(e) {
    this.moveTo(e.clientX, e.clientY);
  }

  dragStop(e) {
    document.removeEventListener('mouseup', this.dragStop);
    document.removeEventListener('mousemove', this.dragMove);
    this.destroy();

    // drag over to the delete button, delete variable
    if(e.target == UIController.deleteBtn.element) {
      History.push(Commander.create('DeleteVariable', this.sourceElement.variable.id, BrainGraph.brain.id).processAndSave())
      return;
    }

    // anywhere outside of the panel is a valid drop area
    let rect = ElementController.panel.element.getBoundingClientRect();
    if(e.clientX < rect.left) {
      let pod = null;
      // create variable or property getter
      if(this.sourceElement.variable) {
        pod = {
          ...NodeTemplate.Getter,
          name: `Get ${this.sourceElement.variable.name}`,
          ownerID: BrainGraph.brain.owner.id,
          variableID: this.sourceElement.variable.id,
        }
      }
      else {
        pod = {
          ...NodeTemplate.PropertyGetter,
          name: `Get ${this.sourceElement.name}`,
          ownerID: BrainGraph.brain.owner.id,
          property: this.sourceElement.descriptor.property,
          outputs: [{
            name: this.sourceElement.descriptor.property,
            type: this.sourceElement.descriptor.type
          }]
        }
      }

      // just naive way to centre the new block
      // getter setter usually have this size;
      pod.x = e.clientX - 60;
      pod.y = e.clientY - 60;

      History.push(Commander.create('CreateBlock', pod, BrainGraph.brain.owner.id).processAndSave());
    }
  }

  get name() {
    return this.sourceElement.name;
  }

  get deletable() {
    return this.sourceElement.deletable;
  }
}