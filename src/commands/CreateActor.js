import Command from './Command';
import SpineActor from '../objects/SpineActor';
import GameStart from '../nodes/listeners/GameStart';

export default class CreateActor extends Command
{
  constructor(url) {
    super();
    this.url = url;
    this.actorID = undefined;
  }

  process() {
    var actor = new SpineActor(this.actorID);
    actor.init({
      url: this.url,
      name: 'Donkey',
      scale: {
        x: 0.5,
        y: 0.5
      },
      x: Math.random() * Stage.stageWidth,
      y: Math.random() * Stage.stageHeight,
    })
    Stage.addActor(actor)

    // Add default game start action
    let gameStart = new GameStart();
    gameStart.init({
      owner: actor,
      x: 50,
      y: 50
    })

    this.actorID = actor.id;

    return this;
  }

  undo() {
    let actor = LookUp.get(this.actorID);
    actor.destroy();
    Stage.removeActor(actor);
  }

  redo() {
    this.process();
  }
}