import Command from './Command';
import SpineActor from '../objects/SpineActor';
import GameStart from '../nodes/listeners/GameStart';
import Animation from '../nodes/Animation';

export default class CreateActor extends Command
{
  constructor(url) {
    super();
    this.url = url;
    this.actorID = null;
  }

  process() {
    var actor = new SpineActor(this.actorID);
    actor.init({
      url: this.url,
      scale: {
        x: 0.5,
        y: 0.5
      },
      x: Math.random() * Editor.stage.stageWidth,
      y: Math.random() * Editor.stage.stageHeight,
    })
    Editor.stage.addActor(actor)

    // Add default game start action
    let gameStart = new GameStart();
    gameStart.init({
      ...NodeTemplate.GameStart,
      owner: actor,
      x: 50,
      y: 50
    })

    let animation = new Animation();
    animation.init({
      ...NodeTemplate.Animation,
      owner: actor,
      x: 250,
      y: 50,
      memory: {
        name: 'idle'
      }
    })
    gameStart.connectNext(animation)

    this.actorID = actor.id;

    return this;
  }

  undo() {
    let actor = LookUp.get(this.actorID);
    actor.destroy();
    Editor.stage.removeActor(actor);
  }

  redo() {
    this.process();
  }
}