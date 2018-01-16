import Command from './Command';

export default class OpenGraph extends Command
{
  constructor(brainID) {
    super();
    this.passThrough = true;
    this.brainID = brainID;
  }

  process() {
    let brain = LookUp.get(this.brainID);
    BrainGraph.open(brain);
    // make sure its owner is selected
    brain.owner.select();
    return this;
  }

  undo() {
    BrainGraph.close();
  }

  redo() {
    this.process();
  }
}