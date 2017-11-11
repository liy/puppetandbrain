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
import FunctionTask from './tasks/FunctionTask';
import DelayTask from './tasks/DelayTask';
import MoveTask from './tasks/MoveTask';
import GroupTask from './tasks/GroupTask';
import PrintTask from './tasks/PrintTask';
import AnimationTask from './tasks/AnimationTask';

import ActivitySerializer from './ActivitySerializer';
import ActivityLoader from './ActivityLoader';
import { Accessor, Data } from './Data';


var appDiv = document.getElementById('app');
var canvas = document.createElement('canvas');
appDiv.appendChild(canvas);
window.renderer = PIXI.autoDetectRenderer({
  autoStart: true,
  width: 1024, 
  height: 768, 
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

  let animationTask = new AnimationTask();
  animationTask.init({
    actor: donkey,
    name: 'walk'
  })
  let onDonkeyExcit = new FunctionTask();
  onDonkeyExcit.init({
    actor: donkey,
    name: 'playAnimation'
  })
  onDonkeyExcit.inputs.add('animationName', new Data())
  onDonkeyExcit.chain(animationTask);

  // Let the animation task name input referencing the function's animaitonName input data
  animationTask.inputs.set('name', onDonkeyExcit.inputs.get('animationName'));
  

  
  // Cow
  var cow = new SpineActor(require('./assets/cow/cow.info.json'));
  cow.scale = {
    x: 0.5,
    y: 0.5
  }
  cow.x = 0;
  cow.y = 768/2;
  Stage.addActor(cow)

  let staticAnimationTask = new AnimationTask();
  staticAnimationTask.init({
    actor: cow,
    name: 'static'
  });

  let delayTask = new DelayTask();
  delayTask.init({
    actor: cow,
    seconds: 2
  });

  let groupTask = new GroupTask()
  groupTask.init({
    actor: cow,
  })
  groupTask.add(staticAnimationTask, delayTask);

  let walkAnimationTask = new AnimationTask();
  walkAnimationTask.init({
    actor: cow,
    name: 'walk'
  });

  let moveTask = new MoveTask(cow);
  moveTask.init({
    actor: cow,
    position: {x:1024/2.5,y:cow.y},
    duration: 3
  })
  
  let startTask = new FunctionTask();
  startTask.init({
    actor: cow,
    name: FunctionName.GAME_START
  })

  onDonkeyExcit.inputs.update('animationName', 'interactive');
  startTask.chain(groupTask, walkAnimationTask, moveTask)
           .chain(onDonkeyExcit)
  
  Promise.all([cow.loaded, donkey.loaded]).then(() => {
    startTask.run().then(() => {
      console.log('all done')
    })
  })
  
  // serialize everything.
  let as = new ActivitySerializer();
  console.warn('activity json data', as.start()); 
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
