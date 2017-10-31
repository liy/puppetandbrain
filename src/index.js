// for testing
require('pixi-spine');

// require('./assets/cow/cow.atlas')
// require('./assets/cow/cow.png')
// require('./assets/cow/cow2.png')
// require('./assets/cow/cow3.png')
// require('./assets/cow/cow.json')
// require('./assets/donkey/donkey.atlas')
// require('./assets/donkey/donkey.png')
// require('./assets/donkey/donkey2.png')
// require('./assets/donkey/donkey.json')


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
import FunctionCallTask from './tasks/FunctionCallTask';

import ActivitySerializer from './ActivitySerializer';
import ActivityLoader from './ActivityLoader';


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
  // console.log('render')
  renderer.render(Stage);
  // console.log('')
}
PIXI.ticker.shared.add(render);


function init() {
  var cow = new SpineActor(require('./assets/cow/cow.info.json'));
  cow.setAnimation('walk');
  cow.getAnimations().then(animations => {
    // console.log(animations)
  })
  cow.scale = {
    x: 0.5,
    y: 0.5
  }
  cow.x = 0;
  cow.y = 768/2;
  Stage.addActor(cow)
  
  
  var donkey = new SpineActor(require('./assets/donkey/donkey.info.json'));
  donkey.setAnimation('static');
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
  let functionTask = new FunctionTask();
  functionTask.init({
    actor: donkey,
    name: 'playAnimation'
  })
  functionTask.outputs.create('animationName', 'walk')
  functionTask.outputs.slot('animationName').link(animationTask.inputs.slot('name'));
  functionTask.chain(animationTask);
  
  
  let callTask = new FunctionCallTask();
  callTask.init({
    actor: cow,
    target: functionTask,
  })
  // function call task acts like wrapper around the target function task
  callTask.target.outputs.data('animationName').value = 'interactive'
  
  let groupTask = new GroupTask()
  groupTask.init({
    actor: cow,
  })
  for(let i=0; i<3; ++i) {
    let task = new PrintTask();
    task.init({
      actor: cow,
      text: 'test ' + (i+1)
    })
    groupTask.add(task)
  }
  
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
  let delayTask = new DelayTask();
  delayTask.init({
    actor: cow,
    seconds: 2
  });
  startTask.chain(delayTask)
           .chain(groupTask, moveTask)
           .chain(callTask)
  
  
  
  Promise.all([cow.loaded, donkey.loaded]).then(() => {
    startTask.run().then(() => {
      console.log('all done')
    })
  })
  
  let as = new ActivitySerializer();
  console.log(as.start());  
}

// init();

async function load() {
  var loader = new ActivityLoader();
  await loader.load(require('./assets/activity.json'))

  let promises = LookUp.getActors().map(actor => {
    return actor.loaded;
  })

  Promise.all(promises).then(() => {
    console.log(LookUp.pod())

    // HACK, I know item 35 is a start function
    LookUp.get(35).run().then(() => {
      console.log('all done')
    })
  })
}

load();
