// for testing
require('pixi-spine');

// require('./assets/cow/cow.atlas')
// require('./assets/cow/cow.png')
// require('./assets/cow/cow2.png')
// require('./assets/cow/cow3.png')
// require('./assets/cow/cow.json')


require('./utils/ActorLookUp')
require('./utils/TaskLookUp')


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


window.cow = new SpineActor(require('./assets/cow/info.json'));
cow.setAnimation('walk');
cow.getAnimations().then(animations => {
  // console.log(animations)
})
cow.scale = {
  x: 0.5,
  y: 0.5
}
cow.x = 400;
cow.y = 300;
Stage.addActor(cow)

window.cow2 = new SpineActor(require('./assets/cow/info.json'));
cow2.setAnimation('static');
cow2.getAnimations().then(animations => {
  // console.log(animations)
})
cow2.scale = {
  x: 0.5,
  y: 0.5
}
cow2.x = 700;
cow2.y = 500;
Stage.addActor(cow2)

let animationTask = new AnimationTask('walk', cow2);
let functionTask = new FunctionTask('playAnimation',cow2);
functionTask.outputs.create('animationName')
functionTask.chain(animationTask);

// animationTask.inputs.slot('animationName').link(functionTask.outputs.slot('animationName'));
functionTask.outputs.slot('animationName').link(animationTask.inputs.slot('animationName'));




let callTask = new FunctionCallTask(functionTask, cow2);
callTask.functionTask.outputs.data('animationName').value = 'interactive'

let groupTask = new GroupTask(cow)
groupTask.add(
  new PrintTask('test 1', cow),
  new PrintTask('test 2', cow),
  new PrintTask('test 3', cow),
)
let moveTask = new MoveTask(cow);
moveTask.inputs.data('position').value = {x:0,y:0};
moveTask.inputs.data('duration').value = 3;

new FunctionTask(FunctionName.GAME_START, cow)
                 .chain(new DelayTask(2, cow))
                 .chain(groupTask, new DelayTask(2000, cow))
                 .chain(moveTask)
                 .chain(callTask)











cow.functions[FunctionName.GAME_START].run().then(() => {
  console.log('all done')
})





// let as = new ActivitySerializer();
// console.log(as.start());