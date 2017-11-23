import Command from './Command';

export default class CloseGraph extends Command
{
  constructor(brainID) {
    super();
    this.passThrough = true;
    this.brainID = brainID;
  }

  process() {
    BrainGraph.close();
    return this;
  }

  undo() {
    BrainGraph.open(LookUp.get(this.brainID));
  }

  redo() {
    this.process();
  }
}