import Command from './Command';

export default class OpenGraph extends Command
{
  constructor(brainID) {
    super();
    this.passThrough = true;
    this.brainID = brainID;
  }

  process() {
    BrainGraph.open(LookUp.get(this.brainID));
    return this;
  }

  undo() {
    BrainGraph.close();
  }

  redo() {
    this.process();
  }
}