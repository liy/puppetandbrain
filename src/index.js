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
import CallFunctionTask from './tasks/CallFunctionTask';

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


let functionTask = new FunctionTask({name:'playAnimation', actor:cow2, params: {
  animationName: ''
}});
let animationTask = new AnimationTask({actor:cow2, params: {animationName: 'walk'}});
cow2.functions['playAnimation'] = functionTask;
functionTask.chain(animationTask);



let groupTask = new GroupTask({actor:cow})
groupTask.add(
  new PrintTask({text:'test 1', actor:cow}),
  new PrintTask({text:'test 2', actor:cow}),
  new PrintTask({text:'test 3', actor:cow}),
)
let callTask = new CallFunctionTask({actor:cow, callee:cow2, functionName:'playAnimation'});
callTask.params.animationName = 'interactive'
cow.functions[FunctionName.GAME_START] = new FunctionTask({name:FunctionName.GAME_START, actor:cow})
cow.functions[FunctionName.GAME_START]
                 .chain(new DelayTask({miniseconds:2000, actor:cow}))
                 .chain(groupTask, new DelayTask({miniseconds:2000, actor:cow}))
                 .chain(new MoveTask({target:{x:0,y:0}, duration:1000, actor:cow}))
                 .chain(callTask)
cow.functions[FunctionName.GAME_START].run().then(() => {
  console.log('all done')
})





let as = new ActivitySerializer();
console.log(as.start());