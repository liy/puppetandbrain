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
import TweenLeft from '../nodes/TweenLeft';
import Keyboard from '../nodes/listeners/Keyboard';
import {isMobile} from '../utils/utils';



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
        'sound url': 'Jambalaya Loop.mp3',
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

    let switchAccess = new SwitchAccess();
    switchAccess.init({
      owner: actor,
      x: 50,
      y: 532,
      variables: {
        debounce: 0,
        'pre-acceptance': 0
      }
    })

    let branch = new Branch();
    branch.init({
      owner: actor,
      x: 383,
      y: 532,
    })

    let flipLeft = new FlipLeft();
    flipLeft.init({
      owner: actor,
      x: 590,
      y: 488,
    })

    let flipRight = new FlipRight();
    flipRight.init({
      owner: actor,
      x: 590,
      y: 611,
    })

    let moveLeft = new TweenLeft();
    moveLeft.init({
      owner: actor,
      x: 820,
      y: 437,
    })

    let moveRight = new TweenRight();
    moveRight.init({
      owner: actor,
      x: 820,
      y: 661,
    })

    let equal = new Equal();
    equal.init({
      owner: actor,
      variables: {
        B: 'left'
      },
      x: 240,
      y: 600,
    })

    let leftKey = new Keyboard();
    leftKey.init({
      owner: actor,
      variables: {
        code: 'ArrowLeft'
      },
      x: 50,
      y: 406,
    })

    let rightKey = new Keyboard();
    rightKey.init({
      owner: actor,
      variables: {
        code: 'ArrowRight'
      },
      x: 50,
      y: 717,
    })

    gameStart.connectNext(animation)
    animation.connectNext(playSound);
    // on desktop use recursion 
    if(!isMobile) {
      // keep play the sound!
      playSound.connectNext(playSound, 'completed');
    }
    animationEvent.connectNext(playEventSound);

    switchAccess.connectNext(branch, 'switch down')
    branch.connectNext(flipLeft, 'true')
    branch.connectNext(flipRight, 'false')
    flipLeft.connectNext(moveLeft);
    flipRight.connectNext(moveRight);
    rightKey.connectNext(flipRight, 'key down')
    leftKey.connectNext(flipLeft, 'key down')


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