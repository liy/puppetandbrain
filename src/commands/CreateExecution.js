import Command from "./Command";

export default class CreateExecution extends Command
{
  constructor(source, executionName, target) {
    super();
    this.source = source;
    this.executionName = executionName;
    this.target = target;

    this.oldTarget = this.source.execution.get(executionName);

    this.push();
  }

  process() {
    this.source.connectNext(this.target, this.executionName);
  }

  undo() {
    this.source.connectNext(this.oldTarget, this.executionName);
    BrainGraph.refresh()
  }

  redo() {
    this.process();
    BrainGraph.refresh()
  }
}