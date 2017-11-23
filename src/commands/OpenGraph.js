import Command from './Command';

export default class OpenGraph extends Command
{
  constructor(brain) {
    super();
    this.passThrough = true;
    this.brain = brain;
  }

  process() {
    BrainGraph.open(this.brain);
    return this;
  }

  undo() {
    BrainGraph.close();
  }

  redo() {
    this.process();
  }
}