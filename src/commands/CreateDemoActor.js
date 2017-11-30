import Command from './Command';
import SpineActor from '../objects/SpineActor';
import GameStart from '../nodes/listeners/GameStart';
import Animation from '../nodes/Animation';
import PlaySound from '../nodes/PlaySound';

export default class CreateDemoActor extends Command
{
  constructor(url) {
    super();
    this.url = url;
    this.actorID = null;
  }

  async process() {
    var actor = new SpineActor(this.actorID);
    actor.init({
      url: this.url,
      scale: {
        x: 0.5,
        y: 0.5
      },
      x: Math.random() * Stage.stageWidth,
      y: Math.random() * Stage.stageHeight,
    })
    Stage.addActor(actor)

    // wait until it finishes loading
    // as we will fetching actor information
    await actor.loaded;

    // Add default game start action
    let gameStart = new GameStart();
    gameStart.init({
      owner: actor,
      x: 50,
      y: 50
    })

    let animation = new Animation();
    animation.init({
      owner: actor,
      x: 250,
      y: 50,
      variables: {
        name: 'walk'
      }
    })

    let playSound = new PlaySound();
    playSound.init({
      owner: actor,
      x: 500,
      y: 50,
      variables: {
        'sound name': actor.name + '-walk.mp3'
      }
    })

    gameStart.connectNext(animation)
    animation.connectNext(playSound);
    // keep play the sound!
    playSound.connectNext(playSound, 'complete');

    this.actorID = actor.id;

    return this;
  }

  undo() {
    let actor = LookUp.get(this.actorID);
    actor.destroy();
    Stage.removeActor(actor);
  }

  redo() {
    this.processAndSave();
  }
}