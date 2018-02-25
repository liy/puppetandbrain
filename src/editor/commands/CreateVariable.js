import Command from './Command';

export default class CreateVariable extends Command
{
  constructor(variablePod) {
    super();
    this.variablePod = variablePod;
  }

  get variables() {
    return this.lookUp.get(this.variablePod.brainID).variables;
  }

  process() {
    // if the pod has id, it will use the id, otherwise new id will be created
    // so it is safe to call this in redo.
    this.variablePod.id = this.variables.create(this.variablePod).id;
    return this;
  }

  undo() {
    Commander.create('DeleteVariable', this.variablePod.id, this.variablePod.brainID).process();
  }

  redo() {
    this.process();
  }
}