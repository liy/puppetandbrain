import Command from './Command';

export default class MoveBlock extends Command
{
  constructor(block) {
    super();
    // Note that, I'm using id here! Not reference.
    this.blockID = block.id;
    this.oldX = block.x;
    this.oldY = block.y;
  }

  process() {
    let block = BrainGraph.getBlock(this.blockID);
    this.newX = block.x;
    this.newY = block.y;

    // epsilon to decide whether the command needs to be pushed to history
    // This solve the double click cause tiny movement results a move command issue.
    if(Math.abs(this.oldX - this.newX) > 1 && Math.abs(this.oldY - this.newY) > 1) {
      console.warn('push move block!!!')
      History.push(this);
    }
  }

  undo() {
    let block = BrainGraph.getBlock(this.blockID);
    block.x = this.oldX;
    block.y = this.oldY;
    BrainGraph.refresh();
  }

  redo() {
    let block = BrainGraph.getBlock(this.blockID);
    block.x = this.newX;
    block.y = this.newY;
    BrainGraph.refresh();
  }
}