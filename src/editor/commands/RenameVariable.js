import Command from './Command';

export default class RenameVariable extends Command
{
  constructor(brainID, oldName, newName) {
    super();

    this.brainID = brainID;
    this.oldName =  oldName;
    this.newName = String.trim(newName);
  }

  get variables() {
    return this.lookUp.get(this.brainID).variables;
  }

  process() {
    if(!this.variables.rename(this.oldName, this.newName)) {
      return null;
    }
    return this;
  }

  undo() {
    this.variables.rename(this.newName, this.oldName)
  }

  redo() {
    this.process();
  }
}