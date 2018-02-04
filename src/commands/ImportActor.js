import Command from './Command';
import ActorImporter from '../ActorImporter';

export default class ImportActor extends Command
{
  constructor(template) {
    super();

    this.template = template;
  }

  process() {
    let importActor = new ActorImporter();
    return importActor.start(this.template).then(actor => {
      this.actorID = actor.id;
      return this;
    })
  }

  undo() {
    this.deleteCommand = Commander.create('DeleteActor', this.actorID).process();
  }

  redo() {
    this.deleteCommand.undo();
  }
}