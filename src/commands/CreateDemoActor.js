import Command from './Command';
import SpineActor from '../objects/SpineActor';
import GameStart from '../nodes/listeners/GameStart';
import Animation from '../nodes/Animation';
import PlaySound from '../nodes/PlaySound';
import AnimationEvent from '../nodes/listeners/AnimationEvent';
import SwitchAccess from '../nodes/listeners/SwitchAccess';
import Branch from '../nodes/Branch';
import {Equal} from '../nodes/Operator';
import FlipLeft from '../nodes/FlipLeft';
import FlipRight from '../nodes/FlipRight';
import TweenRight from '../nodes/TweenRight';
import utils from '../utils/utils';



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

    let playSound = new PlaySound();
    playSound.init({
      owner: actor,
      x: 500,
      y: 50,
      variables: {
        'sound url': 'Jambalaya Loop.ogg',
        // On mobile play sound require a user interaciton so enable loop by default
        'loop': utils.isMobile
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

    let switchAccess = new SwitchAccess();
    switchAccess.init({
      owner: actor,
      x: 50,
      y: 463,
      variables: {
        debounce: 0,
        'pre-acceptance': 0
      }
    })

    let branch = new Branch();
    branch.init({
      owner: actor,
      x: 383,
      y: 463,
    })

    let flipLeft = new FlipLeft();
    flipLeft.init({
      owner: actor,
      x: 590,
      y: 434,
    })

    let flipRight = new FlipRight();
    flipRight.init({
      owner: actor,
      x: 590,
      y: 521,
    })

    let moveLeft = new TweenRight();
    moveLeft.init({
      owner: actor,
      variables: {
        steps: -1,
        duration: 1,
      },
      x: 827,
      y: 398,
    })

    let moveRight = new TweenRight();
    moveRight.init({
      owner: actor,
      variables: {
        steps: 1,
        duration: 1,
      },
      x: 833,
      y: 561,
    })

    let equal = new Equal();
    equal.init({
      owner: actor,
      variables: {
        B: 'left'
      },
      x: 240,
      y: 540,
    })

    gameStart.connectNext(animation)
    animation.connectNext(playSound);
    // on desktop use recursion 
    if(!utils.isMobile) {
      // keep play the sound!
      playSound.connectNext(playSound, 'completed');
    }
    animationEvent.connectNext(playEventSound);

    switchAccess.connectNext(branch, 'switch down')
    branch.connectNext(flipLeft, 'true')
    branch.connectNext(flipRight, 'false')
    flipLeft.connectNext(moveLeft);
    flipRight.connectNext(moveRight);


    // play event sound
    playEventSound.inputs.get('sound url').connect(animationEvent.outputs.get('event name'));
    equal.inputs.get('A').connect(switchAccess.outputs.get('which'));
    branch.inputs.get('condition').connect(equal.outputs.get('value'));

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