// for testing
require('pixi-spine');
require('./assets/cow/cow.atlas')
require('./assets/cow/cow.png')
require('./assets/cow/cow2.png')
require('./assets/cow/cow3.png')
require('./assets/cow/cow.json')
require('./assets/donkey/donkey.atlas')
require('./assets/donkey/donkey.png')
require('./assets/donkey/donkey2.png')
require('./assets/donkey/donkey.json')



// imports
require('./utils/LookUp')
import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';
import Trigger from './objects/Trigger';
import Stage from './Stage';

import FunctionName from './tasks/FunctionName';
import Function from './tasks/Function';
import Wait from './tasks/Wait';
import Tween from './tasks/Tween';
import Trace from './tasks/Trace';
import Animation from './tasks/Animation';
import Branch from './tasks/Branch';
import Call from './tasks/Call';
import Property from './value/Property';
import {Equal, RandomNumber, LessThan} from './value/Arithmetic';

import ActivityLoader from './ActivityLoader';
import Graph from './ui/Graph';
import Block from './ui/Block';
import ArithmeticBlock from './ui/ArithmeticBlock';
import TaskBlock from './ui/TaskBlock';

var appDiv = document.getElementById('app');
var canvas = document.createElement('canvas');

appDiv.appendChild(canvas);
window.renderer = PIXI.autoDetectRenderer({
  autoStart: true,
  width: window.innerWidth, 
  height: window.innerHeight, 
  view: canvas,
  transparent: true,
  antialias: true
});

Stage.init(renderer.width, renderer.height);
function render() {
  renderer.render(Stage);
}
PIXI.ticker.shared.add(render);

Stage.blurEnabled = true;


function init() {
  // Donkey!  
  var donkey = new SpineActor(require('./assets/donkey/donkey.info.json'));
  donkey.scale = {
    x: 0.5,
    y: 0.5
  }
  donkey.x = 1024/1.5;
  donkey.y = 200;
  Stage.addActor(donkey)

  let animation = new Animation();
  animation.init({
    actor: donkey,
    name: 'walk'
  })
  let delayAnimation = new Wait();
  delayAnimation.init({
    actor: donkey,
    seconds: 3
  })
  let onDonkeyExcit = new Function();
  onDonkeyExcit.init({
    actor: donkey,
    functionName: 'playAnimation'
  })
  onDonkeyExcit.outputs.add('animationName')
  onDonkeyExcit.chain(delayAnimation, animation);

  // Let the animation task name input referencing the function's animaitonName input data
  animation.inputs.connect('name', onDonkeyExcit, 'animationName');
  

  // var trigger = new Trigger();
  // trigger.x = 100;
  // trigger.y = 200
  // Stage.addActor(trigger);
  
  // Cow
  var cow = new SpineActor(require('./assets/cow/cow.info.json'));
  cow.scale = {
    x: 0.5,
    y: 0.5
  }
  cow.x = 0;
  cow.y = 768/2;
  Stage.addActor(cow)

  // let mouseDownFunction = new Function();
  // mouseDownFunction.init({
  //   actor: cow,
  //   name: FunctionName.POINTER_DOWN
  // })
  // let downTrace = new Trace();
  // downTrace.init({
  //   actor: cow,
  //   text: FunctionName.POINTER_DOWN
  // })
  // mouseDownFunction.chain(downTrace);

  // let mouseUpFunction = new Function();
  // mouseUpFunction.init({
  //   actor: cow,
  //   name: FunctionName.POINTER_UP
  // })
  // let upTrace = new Trace();
  // upTrace.init({
  //   actor: cow,
  //   text: FunctionName.POINTER_UP
  // })
  // mouseUpFunction.chain(upTrace);

  let staticAnimation = new Animation();
  staticAnimation.init({
    actor: cow,
    name: 'static'
  });

  let wait = new Wait();
  wait.init({
    actor: cow,
    seconds: 2
  });

  let trace = new Trace();
  trace.init({
    actor: cow,
    text: 'debug print'
  })

  let walkAnimation = new Animation();
  walkAnimation.init({
    actor: cow,
    name: 'walk'
  });

  let positionProperty = new Property(donkey, 'position');

  let tween = new Tween(cow);
  tween.init({
    actor: cow,
    duration: 3
  })
  // link to donkey's position
  tween.inputs.connect('position', positionProperty, 'position')
  
  let startTask = new Function();
  startTask.init({
    actor: cow,
    functionName: FunctionName.GAME_START
  })

  let call = new Call();
  call.init({
    actor: cow,
    callee: donkey,
    functionName: "playAnimation"
  })
  call.variables.animationName = 'interactive'
  startTask.chain(staticAnimation, wait, trace, walkAnimation, tween)
           .chain({
             executionName: 'complete',
             task: call
            });
  
  // example of 2 executions
  let straightAfterTween = new Trace();
  straightAfterTween.init({
    actor: cow,
    text: 'This task run straight after tween started, no waiting for tween completion'
  })
  tween.chain({
    executionName: 'default',
    task: straightAfterTween
  })
  
  // statements examples
  let less = new LessThan()
  less.variables.B = 0.5;
  less.inputs.connect('A', new RandomNumber(), 'value');

  let branch = new Branch();
  branch.init({
    actor: cow
  });
  branch.inputs.connect('condition', less, 'value');

  let trueTrace = new Trace();
  trueTrace.init({
    actor: cow,
    text: 'branch to true'
  })

  let falseTrace = new Trace();
  falseTrace.init({
    actor: cow,
    text: 'branch to false'
  })

  branch.execution.set('true', trueTrace)
  branch.execution.set('false', falseTrace)

  call.chain(branch)
  
  // start the activity when cow and donkey are loaded
  Promise.all([cow.loaded, donkey.loaded]).then(() => {

    
    // serialize everything before game start
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod()); 

    // startTask.run()
  })


  
  window.graph = new Graph();
  graph.init(canvas);
}

// init();

async function load() {
  var loader = new ActivityLoader();
  await loader.load(require('./assets/activity.json'))

  // let promises = LookUp.getActors().map(actor => {
  //   return actor.loaded;
  // })

  // Promise.all(promises).then(() => {
  //   console.log(LookUp.pod())

  //   // HACK, I know item 35 is a start function
  //   LookUp.get(21).run().then(() => {
  //     console.log('all done')
  //   })
  // })
}

load();