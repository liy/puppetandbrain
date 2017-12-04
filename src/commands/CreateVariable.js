import Command from './Command';

export default class CreateVariable extends Command
{
  constructor(brainID) {
    super();
    this.brainID = brainID;
    this.variableID = null;
  }

  get variables() {
    return LookUp.get(this.brainID).variables;
  }

  process() {
    let variable = this.variables.create(this.variableID);
    this.variableID = variable.id;
    BrainGraph.variablePanel.appendVariableEntry(variable)
    return this;
  }

  undo() {
    Commander.create('DeleteVariable', this.brainID, this.variableID).process();
    // indicate it is removed... just in case
    this.variable = null;
  }

  redo() {
    this.process();
  }
}