import Command from "./Command";

export default class CreateExecution extends Command
{
  constructor(source, executionName, target) {
    super();
    this.sourceID = source.id;
    this.executionName = executionName;
    this.targetID = target.id;

    this.oldTargetID = source.execution.get(executionName).id;

    this.push();
  }

  process() {
    LookUp.get(this.sourceID).connectNext(LookUp.get(this.targetID), this.executionName);
  }

  undo() {
    LookUp.get(this.sourceID).connectNext(LookUp.get(this.oldTargetID), this.executionName);
    BrainGraph.refresh()
  }

  redo() {
    this.process();
    BrainGraph.refresh()
  }
}