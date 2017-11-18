import Stage from './Stage';
import Entity from './Entity';
import mixin from '../utils/mixin';
import ActionName from '../nodes/ActionName';

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

    this.nodes = [];

    this.childActors = [];

    this.on('pointerdown', this.pointerDown)
    this.on('pointerup', this.pointerUp)

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

  reset() {
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

  pointerDown(e) {
    if(this.actions[ActionName.POINTER_DOWN]) {
      this.actions[ActionName.POINTER_DOWN].run();
    }
  }

  pointerUp(e) {
    if(this.actions[ActionName.POINTER_UP]) {
      this.actions[ActionName.POINTER_UP].run();
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

  clone() {
    // clone actor
    const ns = {
      className: this.__proto__.constructor.name
    }
    console.log(ns.className)
    let actor = new ns.className();
    actor.init(this.pod());

    // TODO: clone nodes




    return actor;
  }
  
  pod() {
    let actions = Object.create(null);
    for(let name in this.actions) {
      actions[name] = this.actions[name].id;
    }

    return {
      class: this.__proto__.constructor.name,
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
      nodes: this.nodes.map(node => {
        return node.id;
      })
    }
  }
}