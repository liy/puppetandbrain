import Command from './Command';

export default class MoveActor extends Command
{
  constructor(actor) {
    super();
    this.actor = actor;
    this.oldX = this.actor.x;
    this.oldY = this.actor.y;
  }

  process() {
    this.newX = this.actor.x;
    this.newY = this.actor.y;

    if(Math.abs(this.oldX - this.newX) > 1 && Math.abs(this.oldY - this.newY) > 1) {
      this.push();
    }
  }

  undo() {
    this.actor.x = this.oldX;
    this.actor.y = this.oldY;
  }

  redo() {
    this.actor.x = this.newX;
    this.actor.y = this.newY;
  }
}