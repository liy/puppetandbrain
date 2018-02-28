import Command from './Command';
import ActorImporter from '../ActorImporter';

export default class ImportActor extends Command
{
  constructor(actorPod) {
    super();

    this.actorPod = actorPod;
  }

  process() {
    // as process will be called again in redo,
    // we should try to keep actor id the same, just in case
    // there are other nodes in futher redo process, who are referencing this actor
    let importActor = new ActorImporter(Hub.activity);
    return importActor.start(this.actorPod).then(actor => {
      this.actor = actor;
      this.actorPod.id = actor.id;
      return this;
    })
  }

  getActor() {
    return this.actor;
  }

  undo() {
    this.deleteCommand = Commander.create('DeleteActor', this.actorPod.id).process();
  }

  redo() {
    this.deleteCommand.undo();
  }
}