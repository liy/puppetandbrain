import Command from './Command';

export default class MoveActor extends Command
{
  constructor(actor) {
    super();
    // Note that, I'm using id here! Not reference.
    this.actorID = actor.id;
    this.oldX = actor.x;
    this.oldY = actor.y;
  }

  process() {
    let actor = LookUp.get(this.actorID);
    this.newX = actor.x;
    this.newY = actor.y;

    // epsilon to decide whether the command needs to be pushed to history
    // This solve the double click cause tiny movement results a move command issue.
    if(Math.abs(this.oldX - this.newX) > 1 && Math.abs(this.oldY - this.newY) > 1) {
      console.warn('!!!!')
      History.push(this);
    }
  }

  undo() {
    let actor = LookUp.get(this.actorID);
    actor.x = this.oldX;
    actor.y = this.oldY;
  }

  redo() {
    let actor = LookUp.get(this.actorID);
    actor.x = this.newX;
    actor.y = this.newY;
  }
}