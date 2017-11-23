import Command from './Command';

export default class CloseGraph extends Command
{
  constructor(brain) {
    super();
    this.passThrough = true;
    this.brain = brain;

    // this.push();
  }

  process() {
    BrainGraph.close();
  }

  undo() {
    BrainGraph.open(this.brain);
  }

  redo() {
    this.process();
  }
}