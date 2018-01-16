import Entity from './Entity';
import mixin from '../utils/mixin';
import EventEmitter from '../utils/EventEmitter';
import TextComponent from '../components/TextComponent';
import Brain from '../nodes/Brain';
import ActorSelection from './ActorSelection';
import Variable from '../data/Variable';

export default class Actor extends EventEmitter
{
  constructor(id) {
    super();

    this.selected = false;
    this._clicks = 0;

    // create an entry in the reference look up
    this.id = LookUp.addActor(this, id);

    this.name = 'Actor ' + this.id;

    // transform for the components
    // also be able to manipulate in the node graph property.
    this.position = {
      x: 0,
      y: 0,
    }
    this.rotation = 0;
    this.scale = {
      x: 1,
      y: 1
    }

    this.relaseOutside = this.relaseOutside.bind(this)
    this.dragMove = this.dragMove.bind(this);

    // release outside
    document.addEventListener('mouseup', this.relaseOutside);

    mixin(this, new Entity());
  }

  init(pod={}) {
    this.position.x = pod.x || 0;
    this.position.y = pod.y || 0;
    this.rotation = pod.rotation || 0;
    this.scale.x = pod.scaleX || 1;
    this.scale.y = pod.scaleY || 1;

    // Create empty brain but with exisitng ID if there is one.
    // in the future I might allow actors to sharing same brain.
    // therefore, I decide to use separated step to populate the 
    // content of the brain.
    this.brain = new Brain(this, pod.brainID);
  }

  destroy() {
    for(let component of this.components) {
      component.destroy();
    }
    this.components.clear();

    LookUp.removeActor(this.id);

    document.removeEventListener('mousemove', this.dragMove);
  }

  mouseDown(x, y, offset) {
    this.select();

    this.offset = offset;
    this.position.x = x;
    this.position.y = y;
    document.addEventListener('mousemove', this.dragMove);
  }

  mouseUp(e) {
    document.removeEventListener('mousemove', this.dragMove);

    // double click to open brain
    setTimeout(() => {
      this._clicks = 0;
    }, 300)
    if(++this._clicks%2 == 0) {
      History.push(Commander.create('OpenGraph', this.brain.id).process());
    }
  }

  relaseOutside() {
    document.removeEventListener('mousemove', this.dragMove);
  }

  mouseOver() {

  }

  mouseOut() {

  }

  dragMove(e) {
    this.position.x = e.clientX + this.offset.x;
    this.position.y = e.clientY + this.offset.y;
  }

  select() {
    ActorSelection.set(this);
    this.selected = true;

    // TODO: override this to make selection box
  }

  deselect() {
    ActorSelection.remove(this);
    this.selected = false;
  }

  updateTransform() {
    for(let component of this.components) {
      component.updateTransform();
    }
  }

  get className() {
    return this.__proto__.constructor.name;
  }

  pod(detail=false) {
    let pod = {
      className: this.className,
      id: this.id,
      x: this.position.x,
      y: this.position.y,
      scaleX: this.scale.x,
      scaleY: this.scale.y,
      name: this.name,
      childActors: this.childActors.concat(),
      brainID: this.brain.id,
    }

    if(detail) {
      pod.brain = this.brain.pod(detail);
    } 

    return pod;
  }
}