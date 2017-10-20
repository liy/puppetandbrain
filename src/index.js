// for testing
require('pixi-spine');

// require('./assets/cow/cow.atlas')
// require('./assets/cow/cow.png')
// require('./assets/cow/cow2.png')
// require('./assets/cow/cow3.png')
// require('./assets/cow/cow.json')



import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';
import Stage from './Stage';

import TaskEvent from './tasks/TaskEvent';
import DelayTask from './tasks/DelayTask';
import MoveTask from './tasks/MoveTask';
import GroupTask from './tasks/GroupTask';
import PrintTask from './tasks/PrintTask';

import RoutePod from './tasks/RoutePod'

import Classier from './Classifier';


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
Stage.addChild(cow)

// let m1 = new Move({x: 100, y: 100}, 1000);
// let m2 = new Move({x: 400, y: 400}, 2000);
// cow.cmd.add(m1);
// m1.add(m2)
// cow.cmd.run();

let groupTask = new GroupTask()
groupTask.add(
  new PrintTask('test 1'),
  new PrintTask('test 2'),
  new PrintTask('test 3'),
)


cow.entryTasks[TaskEvent.GAME_START].chain(new DelayTask(2000))
                 .chain(groupTask, new DelayTask(2000))
                 .chain(new MoveTask(cow, {x:0,y:0}, 1000));

cow.entryTasks[TaskEvent.GAME_START].run().then(() => {
  console.log('all done')
})

let s = new RoutePod(cow);
console.log( JSON.stringify(s.start()) );