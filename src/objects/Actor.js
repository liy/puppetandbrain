import Stage from '../Stage';
import Entity from './Entity';
import mixin from '../utils/mixin';
import Command from '../commands/Command'

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

    this.cmd = new Command();
    this.cmd.target = this;

    mixin(this, new Entity(id));
  }

  tick() {
    super.tick();
    this.cmd.tick();
  }
}