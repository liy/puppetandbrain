import Stage from '../Stage';
import Entity from './Entity';
import mixin from '../utils/mixin';
import EntryTask from '../tasks/EntryTask'
import TaskEvent from '../tasks/TaskEvent'

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

    this.entryTasks = {
      [TaskEvent.GAME_START]: new EntryTask(TaskEvent.GAME_START)
    };

    mixin(this, new Entity(id));
  }

  tick() {
    super.tick();
    this.cmd.tick();
  }
}