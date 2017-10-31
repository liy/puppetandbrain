import Stage from '../Stage';
import Entity from './Entity';
import mixin from '../utils/mixin';
import TaskWalker from '../tasks/TaskWalker';

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

    this.name = 'Actor ' + this.id;

    this.functions = {
      // TODO: maybe remove default entry task?
      // [TaskEvent.GAME_START]: new EntryTask({type:TaskEvent.GAME_START})
    };

    mixin(this, new Entity(id));

    this.childActors = [];
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

  tick() {
    super.tick();
    this.cmd.tick();
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      id: this.id,
      name: this.name,
      childActors: this.childActors.concat(),
    }
  }
}