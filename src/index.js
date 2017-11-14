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
import Stage from './Stage';

import FunctionName from './tasks/FunctionName';
import Function from './tasks/Function';
import Wait from './tasks/Wait';
import Tween from './tasks/Tween';
import Group from './tasks/Group';
import Trace from './tasks/Trace';
import Animation from './tasks/Animation';

import ActivitySerializer from './ActivitySerializer';
import ActivityLoader from './ActivityLoader';
import { Accessor, Data } from './Data';
import Trigger from './objects/Trigger';
import Branch from './tasks/Branch';
import {Equal, RandomNumber, LessThan} from './statements/Arithmetic';
import Property from './statements/Property';
import Call from './tasks/Call';
import Graph from './ui/Graph';
import Block from './ui/Block';
import ArithmeticBlock from './ui/ArithmeticBlock';

var appDiv = document.getElementById('app');
var canvas = document.createElement('canvas');
appDiv.appendChild(canvas);
window.renderer = PIXI.autoDetectRenderer({
  autoStart: true,
  width: 800, 
  height: 600, 
  view: canvas,
  // transparent: true,
  antialias: true
});

Stage.init(renderer.width, renderer.height);
function render() {
  renderer.render(Stage);
}
PIXI.ticker.shared.add(render);


function init() {
  // Donkey!  
  var donkey = new SpineActor(require('./assets/donkey/donkey.info.json'));
  donkey.scale = {
    x: 0.5,
    y: 0.5
  }
  donkey.x = 1024/1.5;
  donkey.y = 768/2;
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
    name: 'playAnimation'
  })
  onDonkeyExcit.outputs.add('animationName', new Data())
  onDonkeyExcit.chain(delayAnimation, animation);

  // Let the animation task name input referencing the function's animaitonName input data
  animation.inputs.set('name', onDonkeyExcit.outputs.get('animationName'));
  

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

  let tween = new Tween(cow);
  tween.init({
    actor: cow,
    duration: 3
  })
  // link to donkey's position
  tween.inputs.set('position', new Property('position', donkey))
  
  let startTask = new Function();
  startTask.init({
    actor: cow,
    name: FunctionName.GAME_START
  })

  let call = new Call();
  call.init({
    actor: cow,
    callee: donkey,
    functionName: "playAnimation"
  })
  call.function.outputs.update('animationName', 'interactive');
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
  less.inputs.set('A', new RandomNumber());
  less.inputs.update('B', 0.5);

  let branch = new Branch();
  branch.init({
    actor: cow
  });
  branch.inputs.set('condition', less)

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
    startTask.run()
  })

  // serialize everything.
  let as = new ActivitySerializer();
  console.log('%c Activity %o ', 'color: white; background-color: black', as.start()); 

  
  let graph = new Graph();
  // LookUp.getTasks().forEach(task => {
  //   let block = graph.createBlock(task);
  //   block.x = tx;

  //   let row = tx/block.width
  //   tx = (tx + block.width)%window.innerWidth;
  //   ty = 
  // })
  let tasks = LookUp.getTasks();
  let w = 225;
  let tx = 0;
  let ty = 0;
  let h = 120;
  for(let i=0; i<tasks.length; ++i) {
    let block = new Block(tasks[i])
    graph.add(block);
    block.x = tx;
    block.y = ty + graph.container.offsetTop + Math.random()*60-30;
    tx += w;
    if(tx+w >= window.innerWidth) {
      tx = 0;
      ty += h;
    } 
  }

  let arr = LookUp.getArithmetics();
  for(let i=0; i<arr.length; ++i) {
    let block = new ArithmeticBlock(arr[i])
    graph.add(block);
    block.x = tx;
    block.y = ty + graph.container.offsetTop + Math.random()*60-30;
    tx += w;
    if(tx+w >= window.innerWidth) {
      tx = 0;
      ty += h;
    }
  }
  graph.refresh();
}

init();

// async function load() {
//   var loader = new ActivityLoader();
//   await loader.load(require('./assets/activity.json'))

//   let promises = LookUp.getActors().map(actor => {
//     return actor.loaded;
//   })

//   Promise.all(promises).then(() => {
//     console.log(LookUp.pod())

//     // HACK, I know item 35 is a start function
//     LookUp.get(21).run().then(() => {
//       console.log('all done')
//     })
//   })
// }

// load();


// testing connect two div using svg
// let svg = document.getElementById('svg');

// let outlet1 = document.getElementById('outlet1')
// let outlet2 = document.getElementById('outlet2')

// let offset = svg.getBoundingClientRect();
// let a = outlet1.getBoundingClientRect();
// let b = outlet2.getBoundingClientRect();

// let x1 = (a.left + a.right)  / 2 - offset.left;
// let y1 = (a.top  + a.bottom) / 2 - offset.top;
// let x2 = (b.left + b.right)  / 2 - offset.left;
// let y2 = (b.top  + b.bottom) / 2 - offset.top;

// let path = document.createElementNS('http://www.w3.org/2000/svg','line');
// path.setAttribute('x1', x1)
// path.setAttribute('y1', y1)
// path.setAttribute('x2', x2)
// path.setAttribute('y2', y2)
// path.setAttribute('stroke', '#FF0000');
// path.setAttribute('stroke-width', 3);
// path.setAttribute('fill', 'transparent');
// svg.appendChild(path);