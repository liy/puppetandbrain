import Stage from './Stage';
import Entity from './Entity';
import mixin from '../utils/mixin';
import ActionName from '../nodes/ActionName';
import Brain from '../nodes/Brain';
import Action from '../nodes/Action';

/**
 * Actor shows up on the stage!
 *
 * @export
 * @class Actor
 * @extends {PIXI.Container}
 */
export default class Actor extends PIXI.Container
{
  constructor(id) {
    super();

    // create an entry in the reference look up
    this.id = LookUp.addActor(this, id);

    this.variables = Object.create(null);

    this.name = 'Actor ' + this.id;

    this.actions = Object.create(null);
    this.customActions = Object.create(null);

    this.childActors = [];

    this._clickCounter = 0;
    this.on('pointerdown', this.pointerDown)

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

    this.brain = new Brain(this, pod.brain);
  }

  destroy() {
    // destroy all components
    Object.keys(this.components).forEach(name => {
      this.components[name].destroy();
    })

    LookUp.removeActor(this.id);
    this.off('pointerdown', this.pointerDown);
    this.brain.destroy();
  }

  setInitialState() {
    // setup initial state
    this.initialState = {
      variables: JSON.parse(JSON.stringify(this.variables)),
      x: this.x,
      y: this.y,
      scale: {
        x: this.scale.x,
        y: this.scale.y
      },
      rotation: this.rotation
    }
  }

  start() {
    if(this.actions[ActionName.GAME_START]) this.actions[ActionName.GAME_START].run();
  }

  terminate() {
    this.x = this.initialState.x;
    this.y = this.initialState.y;
    if(this.initialState.scale) {
      this.scale = {
        x: this.initialState.scale.x,
        y: this.initialState.scale.y
      }
    }
    this.rotation = this.initialState.rotation;
    this.variables = this.initialState.variables;
  }

  createVariable(name, value) {
    this.variables[name] = value;
  }

  get position() {
    let p = super.position;
    return {
      x: p.x,
      y: p.y
    }
  }

  pointerDown(e) {
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

  pod() {
    let actions = Object.create(null);
    for(let name in this.actions) {
      actions[name] = this.actions[name].id;
    }

    return {
      className: this.className,
      id: this.id,
      x: this.x,
      y: this.y,
      scale: {
        x: this.scale.x,
        y: this.scale.y
      },
      name: this.name,
      variables: this.variables,
      childActors: this.childActors.concat(),
      actions,
      brain: this.brain.id,
    }
  }
}