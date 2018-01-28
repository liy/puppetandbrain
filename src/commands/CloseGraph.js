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
    let brain = LookUp.get(this.brainID);
    BrainGraph.open(brain);
    // make sure its owner is selected
    brain.owner.select();
  }

  redo() {
    this.process();
  }
}