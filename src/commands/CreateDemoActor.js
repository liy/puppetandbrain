import Command from './Command';
import SpineActor from '../objects/SpineActor';
import GameStart from '../nodes/listeners/GameStart';
import Animation from '../nodes/Animation';
import PlaySound from '../nodes/PlaySound';
import AnimationEvent from '../nodes/listeners/AnimationEvent';



export default class CreateDemoActor extends Command
{
  constructor() {
    super();
    this.url = require('../assets/cat/cat.info.json');
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
      x: Stage.stageWidth/2,
      y: Stage.stageHeight/2,
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
        name: 'run'
      }
    })

    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    let playSound = new PlaySound();
    playSound.init({
      owner: actor,
      x: 500,
      y: 50,
      variables: {
        'sound url': 'Jambalaya Loop.ogg',
        // On mobile play sound require a user interaciton so enable loop by default
        'loop': isMobile
      }
    })

    let animationEvent = new AnimationEvent();
    animationEvent.init({
      owner: actor,
      x: 50,
      y: 250
    })
    
    let playEventSound = new PlaySound();
    playEventSound.init({
      owner: actor,
      x: 250,
      y: 250,
      variables: {
        'sound url': '',
        'loop': false
      }
    })

    gameStart.connectNext(animation)
    animation.connectNext(playSound);
    // on desktop use recursion 
    if(!isMobile) {
      // keep play the sound!
      playSound.connectNext(playSound, 'completed');
    }

    animationEvent.connectNext(playEventSound);
    // play event sound
    playEventSound.inputs.get('sound url').connect(animationEvent.outputs.get('event name'));

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