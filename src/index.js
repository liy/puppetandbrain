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

// LookUp is a global window variable, save typing!
require('./LookUp');
require('./nodes/NodeFactory');
require('./objects/ActorFactory');

import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';
import Trigger from './objects/Trigger';
import Stage from './objects/Stage';

import ActionName from './nodes/ActionName';
import Action from './nodes/Action';
import Wait from './nodes/Wait';
import Tween from './nodes/Tween';
import Trace from './nodes/Trace';
import Animation from './nodes/Animation';
import Branch from './nodes/Branch';
import Perform from './nodes/Perform';
import Property from './nodes/Property';
import {Equal, RandomNumber, LessThan} from './nodes/Arithmetic'


import ActivityLoader from './ActivityLoader';
import Graph from './graph/Graph';
import Block from './graph/Block';
import ArithmeticBlock from './graph/ArithmeticBlock';
import TaskBlock from './graph/TaskBlock';

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
  var donkey = new SpineActor();
  donkey.init({
    url: require('./assets/donkey/donkey.info.json'),
    name: 'Donkey',
    scale: {
      x: 0.5,
      y: 0.5
    },
    x: 1024/1.5,
    y: 200,
  })
  Stage.addActor(donkey)

  let animation = new Animation();
  animation.init({
    owner: donkey,
    variables: {
      name: 'walk'
    }
  })
  let delayAnimation = new Wait();
  delayAnimation.init({
    owner: donkey,
    variables: {
      seconds: 3
    }
  })
  let donkeyAnimateAction = new Action();
  donkeyAnimateAction.init({
    owner: donkey,
    actionName: 'Play Animation'
  })
  donkeyAnimateAction.outputs.addName('animationName')
  donkeyAnimateAction.chain(delayAnimation, animation);

  // Let the animation task name input referencing the function's animaitonName input data
  animation.inputs.connect('name', donkeyAnimateAction, 'animationName');

  // Cow
  var cow = new SpineActor();
  cow.init({
    url: require('./assets/cow/cow.info.json'),
    name: 'Cow',
    scale: {
      x: 0.5,
      y: 0.5
    },
    x: 0,
    y: 768/2
  })
  Stage.addActor(cow)

  let staticAnimation = new Animation();
  staticAnimation.init({
    owner: cow,
    variables: {
      name: 'static'
    }
  });

  let wait = new Wait();
  wait.init({
    owner: cow,
    seconds: 2
  });

  let trace = new Trace();
  trace.init({
    owner: cow,
    variables: {
      text: 'debug print'
    }
  })

  let walkAnimation = new Animation();
  walkAnimation.init({
    owner: cow,
    variables: {
      name: 'walk'
    }
  });

  let positionProperty = new Property();
  positionProperty.init({
    owner: cow,
    name: 'position',
    variables: {
      target: donkey.id
    }
  });

  window.positionProperty = positionProperty;

  let tween = new Tween();
  tween.init({
    owner: cow,
    variables: {
      duration: 3
    }
  })
  // link to donkey's position
  tween.inputs.connect('position', positionProperty, 'position')

  let startTask = new Action();
  startTask.init({
    owner: cow,
    actionName: ActionName.GAME_START
  })

  let perform = new Perform();
  perform.init({
    owner: cow,
    callee: donkey,
    actionName: "Play Animation",
    variables: {
      animationName: 'interactive'
    }
  })
  startTask.chain(staticAnimation, wait, trace, walkAnimation, tween)
           .chain({
             name: 'complete',
             task: perform
            });

  // example of 2 executions
  let straightAfterTween = new Trace();
  straightAfterTween.init({
    owner: cow,
    variables: {
      text: 'This task run straight after tween started, no waiting for tween completion'
    }
  })
  tween.chain({
    name: 'default',
    task: straightAfterTween
  })

  // statements examples
  let less = new LessThan()
  less.init({
    owner: cow,
    variables: {
      B: 0.5
    }
  })
  let random = new RandomNumber();
  random.init({owner: cow});
  less.inputs.connect('A', random, 'value');

  let branch = new Branch();
  branch.init({
    owner: cow
  });
  branch.inputs.connect('condition', less, 'value');

  let trueTrace = new Trace();
  trueTrace.init({
    owner: cow,
    variables: {
      text: 'branch to true'
    }
  })

  let falseTrace = new Trace();
  falseTrace.init({
    owner: cow,
    variables: {
      text: 'branch to false'
    }
  })

  branch.execution.set('true', trueTrace)
  branch.execution.set('false', falseTrace)

  perform.chain(branch)

  // start the activity when cow and donkey are loaded
  Promise.all([cow.loaded, donkey.loaded]).then(() => {
    // serialize everything before game start
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })

  window.graph = new Graph();
  graph.init();
}

init();

async function load() {
  var loader = new ActivityLoader();
  await loader.load(require('./assets/activity.json'))

  console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());

  window.graph = new Graph();
  graph.init();


  let promises = LookUp.getActors().map(actor => {
    return actor.loaded;
  })

  Promise.all(promises).then(() => {

  })
}

// load();

document.addEventListener('keydown', (e) => {
  if(e.key == 'F6' || e.key == 'F4') {
    e.preventDefault();
    LookUp.toggle();
  }
})