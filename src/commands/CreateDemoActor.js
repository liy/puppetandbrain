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
import StepRight from '../nodes/StepRight';
import StepLeft from '../nodes/StepLeft';
import Keyboard from '../nodes/listeners/Keyboard';
import {isMobile} from '../utils/utils';
import Variable from '../data/Variable';
import DataType from '../data/DataType';



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
      position: {
        x: Editor.stage.stageWidth/2,
        y: Editor.stage.stageHeight/2,
      }
    })
    Editor.stage.addActor(actor)

    // // wait until it finishes loading
    // // as we will fetching actor information
    // await actor.loaded;

    // // Add default game start action
    // let gameStart = new GameStart();
    // gameStart.init({
    //   ...NodeTemplate.GameStart,
    //   ownerID: actor.id,
    //   x: 50,
    //   y: 50
    // })

    // let animation = new Animation();
    // animation.init({
    //   ...NodeTemplate.Animation,
    //   ownerID: actor.id,
    //   x: 250,
    //   y: 50,
    //   memory: {
    //     name: 'run'
    //   }
    // })

    // let playSound = new PlaySound();
    // playSound.init({
    //   ...NodeTemplate.PlaySound,
    //   ownerID: actor.id,
    //   x: 500,
    //   y: 50,
    //   memory: {
    //     'sound url': 'Jambalaya Loop.mp3',
    //     // On mobile play sound require a user interaciton so enable loop by default
    //     'loop': isMobile
    //   }
    // })

    // let animationEvent = new AnimationEvent();
    // animationEvent.init({
    //   ...NodeTemplate.AnimationEvent,
    //   ownerID: actor.id,
    //   x: 50,
    //   y: 250
    // })
    
    // let playEventSound = new PlaySound();
    // playEventSound.init({
    //   ...NodeTemplate.PlaySound,
    //   ownerID: actor.id,
    //   x: 250,
    //   y: 250,
    //   memory: {
    //     'loop': false
    //   }
    // })

    // let switchAccess = new SwitchAccess();
    // switchAccess.init({
    //   ...NodeTemplate.SwitchAccess,
    //   ownerID: actor.id,
    //   x: 50,
    //   y: 532
    // })

    // let branch = new Branch();
    // branch.init({
    //   ...NodeTemplate.Branch,
    //   ownerID: actor.id,
    //   x: 383,
    //   y: 532
    // })

    // let flipLeft = new FlipLeft();
    // flipLeft.init({
    //   ...NodeTemplate.FlipLeft,
    //   ownerID: actor.id,
    //   x: 590,
    //   y: 488,
    // })

    // let flipRight = new FlipRight();
    // flipRight.init({
    //   ...NodeTemplate.FlipRight,
    //   ownerID: actor.id,
    //   x: 590,
    //   y: 611,
    // })

    // let moveLeft = new StepLeft();
    // moveLeft.init({
    //   ...NodeTemplate.StepLeft,
    //   ownerID: actor.id,
    //   x: 820,
    //   y: 437,
    // })

    // let moveRight = new StepRight();
    // moveRight.init({
    //   ...NodeTemplate.StepRight,
    //   ownerID: actor.id,
    //   x: 820,
    //   y: 661,
    // })

    // let equal = new Equal();
    // equal.init({
    //   ...NodeTemplate.Equal,
    //   ownerID: actor.id,
    //   memory: {
    //     // left switch id is 1
    //     B: 1
    //   },
    //   x: 240,
    //   y: 600,
    // })

    // let leftKey = new Keyboard();
    // leftKey.init({
    //   ...NodeTemplate.Keyboard,
    //   ownerID: actor.id,
    //   memory: {
    //     'key name': 'ArrowLeft'
    //   },
    //   x: 50,
    //   y: 406,
    // })

    // let rightKey = new Keyboard();
    // rightKey.init({
    //   ...NodeTemplate.Keyboard,
    //   ownerID: actor.id,
    //   memory: {
    //     'key name': 'ArrowRight'
    //   },
    //   x: 50,
    //   y: 717,
    // })

    // gameStart.connectNext(animation)
    // animation.connectNext(playSound);
    // // on desktop use recursion 
    // if(!isMobile) {
    //   // keep play the sound!
    //   playSound.connectNext(playSound, 'completed');
    // }
    // animationEvent.connectNext(playEventSound);

    // switchAccess.connectNext(branch, 'down')
    // branch.connectNext(flipLeft, 'true')
    // branch.connectNext(flipRight, 'false')
    // flipLeft.connectNext(moveLeft);
    // flipRight.connectNext(moveRight);
    // rightKey.connectNext(flipRight, 'down')
    // leftKey.connectNext(flipLeft, 'down')


    // // play event sound
    // playEventSound.inputs.get('sound url').connect(animationEvent.outputs.get('event name'));
    // equal.inputs.get('A').connect(switchAccess.outputs.get('switch id'));
    // branch.inputs.get('condition').connect(equal.outputs.get('value'));

    // this.actorID = actor.id;

    // actor.brain.variables.create({
    //   type: DataType.GENERIC,
    //   name: 'text',
    //   data: 'this is a fat cat'
    // });

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