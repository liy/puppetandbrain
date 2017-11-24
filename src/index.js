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
require('./graph/BlockFactory');
require('./commands/History');
require('./commands/Commander');
require('./graph/BrainGraph')

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
import {Equal, RandomNumber, LessThan} from './nodes/Operator'
import KeyDown from './nodes/KeyDown';


import ActivityLoader from './ActivityLoader';


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
  donkeyAnimateAction.outputs.addOutput('animationName')
  donkeyAnimateAction.connectNext(delayAnimation)
                     .connectNext(animation)

  let keyboard = new KeyDown();
  keyboard.init({
    owner: donkey,
    variables: {
      key:'1'
    }
  })
  keyboard.connectNext(animation);

  animation.inputs.get('name').connect(donkeyAnimateAction.outputs.get('animationName'));

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
    variables: {
      seconds: 2
    }
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
  tween.inputs.get('position').connect(positionProperty.outputs.get('position'))

  let startTask = new Action();
  startTask.init({
    owner: cow,
    actionName: ActionName.GAME_START
  })

  let perform = new Perform();
  perform.init({
    owner: cow,
    target: donkey,
    actionName: "Play Animation",
    variables: {
      animationName: 'interactive'
    }
  })
  startTask.connectNext(staticAnimation)
           .connectNext(wait)
           .connectNext(trace)
           .connectNext(walkAnimation)
           .connectNext(tween)
           .connectNext(perform, 'complete')

  // example of 2 executions
  let straightAfterTween = new Trace();
  straightAfterTween.init({
    owner: cow,
    variables: {
      text: 'This task run straight after tween started, no waiting for tween completion'
    }
  })
  tween.connectNext(straightAfterTween, 'default')

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
  less.inputs.get('A').connect(random.outputs.get('value'))

  let branch = new Branch();
  branch.init({
    owner: cow
  });
  branch.inputs.get('condition').connect(less.outputs.get('value'))

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

  branch.connectNext(trueTrace, 'true')
  branch.connectNext(falseTrace, 'false')

  perform.connectNext(branch)

  // start the activity when cow and donkey are loaded
  Promise.all([cow.loaded, donkey.loaded]).then(() => {
    // serialize everything before game start
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}

// init();

async function load() {
  var loader = new ActivityLoader();
  await loader.load(require('./assets/activity.json'))

  let promises = LookUp.getActors().map(actor => {
    return actor.loaded;
  })

  Promise.all(promises).then(() => {
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}

load();

// prevent default context menu for the whole site
document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', (e) => {
  if(e.key == 'F6' || e.key == 'F4') {
    e.preventDefault();
    LookUp.toggle();
  }
})