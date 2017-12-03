import Command from './Command';

export default class CreateVariable extends Command
{
  constructor(brainID) {
    super();
    this.brainID = brainID;
  }

  get variables() {
    return LookUp.get(this.brainID).variables;
  }

  process() {
    this.variable = this.variables.create();
    BrainGraph.variablePanel.refresh();
    return this;
  }

  undo() {
    Commander.create('DeleteVariable', this.brainID, this.variable.id).processAndSave();
    // indicate it is removed... just in case
    this.variable = null;
  }

  redo() {
    this.process();
  }
}