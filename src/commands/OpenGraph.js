import Command from './Command';

export default class OpenGraph extends Command
{
  constructor(brain) {
    super();
    this.passThrough = true;
    this.brain = brain;

    this.push();
  }

  process() {
    BrainGraph.open(this.brain);
  }

  undo() {
    BrainGraph.close();
  }

  redo() {
    this.process();
  }
}