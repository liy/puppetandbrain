import Entity from './Entity';
import mixin from '../utils/mixin';
import Brain from '../nodes/Brain';
import Action from '../nodes/Action';

/**
 * Actor shows up on the canvas!
 *
 * @export
 * @class Actor
 * @extends {PIXI.Container}
 */
export default class CanvasActor extends PIXI.Container
{
  constructor(id) {
    super();

    // create an entry in the reference look up
    this.id = LookUp.addActor(this, id);

    this.name = 'Actor ' + this.id;

    this.initialState = {};

    // TODO: make this feature next version?
    this.childActors = [];

    this._clickCounter = 0;
    this.on('pointerup', this.dbClick, this)

    Editor.on('game.prestart', this.gamePrestart, this);
    Editor.on('game.stop', this.gameStop, this);

    mixin(this, new Entity());
  }

  init(pod) {
    this.x = pod.x;
    this.y = pod.y;
    if(pod.scale) {
      this.scale = {
        x: pod.scale.x,
        y: pod.scale.y
      }
    }
    this.rotation = pod.rotation || 0;
    this.name = pod.name || this.name;

    // Create empty brain but with exisitng ID if there is one.
    // in the future I might allow actors to sharing same brain.
    // therefore, I decide to use separated step to populate the 
    // content of the brain.
    this.brain = new Brain(this, pod.brainID);

    this.initialState = {
      x: this.x,
      y: this.y,
      scale: {
        x: this.scale.x,
        y: this.scale.y
      },
      rotation: this.rotation
    }
  }

  destroy() {
    // destroy all components
    Object.keys(this.components).forEach(name => {
      this.components[name].destroy();
    })

    LookUp.removeActor(this.id);
    this.off('pointerup', this.dbClick, this, this);
    Editor.off('game.prestart', this.gamePrestart, this);
    Editor.off('game.stop', this.gameStop, this);
    this.brain.destroy();
  }

  gamePrestart() {
    // setup initial state
    this.initialState = {
      x: this.x,
      y: this.y,
      scale: {
        x: this.scale.x,
        y: this.scale.y
      },
      rotation: this.rotation
    }
  }

  gameStop() {
    this.x = this.initialState.x;
    this.y = this.initialState.y;
    if(this.initialState.scale) {
      this.scale = {
        x: this.initialState.scale.x,
        y: this.initialState.scale.y
      }
    }
    this.rotation = this.initialState.rotation;

    // not used at all?
    // this.variables = this.initialState.variables;
  }

  get position() {
    let p = super.position;
    return {
      x: p.x,
      y: p.y
    }
  }

  dbClick(e) {
    // Open brain graph
    setTimeout(() => {
      this._clickCounter = 0;
    }, 300)
    if(++this._clickCounter%2 == 0) {
      History.push(Commander.create('OpenGraph', this.brain.id).process());
    }
  }

  addActor(actor) {
    this.addChild(actor);
    this.childActors.push(actor.id);
  }

  removeActor(actor) {
    this.removeChild(actor)
    let index = this.childActors.indexOf(actor.id);
    if(index != -1) this.childActors.splice(index);
  }

  copy() {
    let actor = ActorFactory.create(this.className);
    actor.init(this.pod())
    return actor;
  }

  get className() {
    return this.__proto__.constructor.name;
  }

  pod(detail=false) {
    let pod = {
      className: this.className,
      id: this.id,
      x: this.x,
      y: this.y,
      scale: {
        x: this.scale.x,
        y: this.scale.y
      },
      name: this.name,
      childActors: this.childActors.concat(),
      brainID: this.brain.id,
    }

    // FIXME: find a better way to handle saving
    // if game still running, override pod with initial state
    if(Editor.running) Object.assign(pod, this.initialState);

    if(detail) {
      pod.brain = this.brain.pod(detail);
    } 

    return pod;
  }
}