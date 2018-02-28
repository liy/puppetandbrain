import './DragElement.scss'
import ElementController from './ElementController';
import DataType from '../../data/DataType';
import GraphSelection from '../GraphSelection';
import SoundEffect from '@/SoundEffect';
import { isMobile } from '@/utils/utils';
import ConfirmModal from '../../ui/ConfirmModal';

export default class 
{
  constructor(sourceElement) {
    this.sourceElement = sourceElement;

    this.element = document.createElement('div');
    this.element.className = 'base-element drag-element';
    
    this.element.appendChild(this.sourceElement.icon.cloneNode(true));

    this.nameSpan = document.createElement('span');
    this.nameSpan.textContent = this.sourceElement.name;
    this.element.appendChild(this.nameSpan)
    
    this.dragMove = this.dragMove.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.touchDragMove = this.touchDragMove.bind(this);
    this.touchDragStop = this.touchDragStop.bind(this);
  }

  destroy() {
    document.body.removeChild(this.element);
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.dragStop);
    document.removeEventListener('touchmove', this.touchDragMove);
    document.removeEventListener('touchend', this.touchDragStop);

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

  dragStart(x, y) {
    console.log('mouse start', x, y)
    document.body.appendChild(this.element);
    this.moveTo(x, y);

    document.addEventListener('mousemove', this.dragMove);
    document.addEventListener('mouseup', this.dragStop);

    GraphSelection.select(this);
  }

  touchDragStart(x, y) {
    document.body.appendChild(this.element);
    this.moveTo(x, y);

    document.addEventListener('touchmove', this.touchDragMove);
    document.addEventListener('touchend', this.touchDragStop);

    GraphSelection.select(this);
  }

  dragMove(e) {
    this.moveTo(e.clientX, e.clientY);
  }

  touchDragMove(e) {
    // Cannot preventDefault on document level touchstart and touchmove event listener
    // https://www.chromestatus.com/features/5093566007214080
    this.moveTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }

  dragStop(e) {
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.dragStop);
    let target = e.target;
    let x = e.clientX;
    let y = e.clientY;
    this.drop(target, x, y)
  }

  touchDragStop(e) {
    // stop mouse up firing:
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
    e.preventDefault();

    document.removeEventListener('touchmove', this.touchDragMove);
    document.removeEventListener('touchend', this.touchDragStop);

    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    let target = document.elementFromPoint(x,y);
    this.drop(target, x, y)
  }

  async drop(target, x, y) {
    this.destroy();

    // drag over to the delete button, delete variable. Ignore if it has no variable, not a variable element(a property element, cannot be deleted)
    let deleteBtn = document.getElementById('delete-button')
    if(target == deleteBtn && this.sourceElement.variable) {
      let action = true;

      if(this.sourceElement.variable.inUse) {
        action = (await ConfirmModal.open('Variable is in use, do you really want to delete the varaible and its getters and setters?')).action;
      }

      if(action) {
        Hub.history.push(Commander.create('DeleteVariable', this.sourceElement.variable.id, BrainGraph.brain.id).processAndSave())
        SoundEffect.play('trash');
      }
      
      return;
    }

    // anywhere outside of the panel is a valid drop area
    let rect = ElementController.panel.element.getBoundingClientRect();
    if(x < rect.left) {
      let pod = null;
      // create variable or property getter
      if(this.sourceElement.variable) {
        pod = {
          ...NodeTemplate.VariableGetter,
          name: `${this.sourceElement.variable.name}`,
          ownerID: BrainGraph.brain.owner.id,
          variableID: this.sourceElement.variable.id,
        }
      }
      else {
        let propertyName = this.sourceElement.propertyName;
        let descriptor = this.sourceElement.descriptor;
        switch(propertyName) {
          case 'position':
            pod = NodeTemplate.GetPosition
            break;
          case 'scale':
            pod = NodeTemplate.GetScale
            break;
          case 'rotation':
            pod = NodeTemplate.GetRotation
            break;
          default:
            pod = {
              ...NodeTemplate.PropertyGetter,
              name: `${this.sourceElement.name}`,
              ownerID: BrainGraph.brain.owner.id,
              propertyName: propertyName,
              outputs: [{
                name: propertyName,
                descriptor: this.sourceElement.descriptor
              }]
            }
            break;
        }
      }

      // just naive way to centre the new block
      // getter setter usually have this size;
      pod.x = x - 60;
      pod.y = y - 60;

      Hub.history.push(Commander.create('CreateBlock', pod, BrainGraph.brain.owner.id).processAndSave());
    }
  }

  get name() {
    return this.sourceElement.name;
  }

  get deletable() {
    return this.sourceElement.deletable;
  }
}