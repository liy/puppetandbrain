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
    this.translate = {
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
    this.translate.x = pod.x || 0;
    this.translate.y = pod.y || 0;
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

  mouseDown(translateX, translateY, offset) {
    this.select();

    this.offset = offset;
    this.translate.x = translateX+this.offset.x;
    this.translate.y = translateY+this.offset.y;
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
    this.translate.x = e.clientX + this.offset.x;
    this.translate.y = e.clientY + this.offset.y;
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

  get position() {
    return this.translate;
  }

  pod(detail=false) {
    let pod = {
      className: this.className,
      id: this.id,
      x: this.translate.x,
      y: this.translate.y,
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