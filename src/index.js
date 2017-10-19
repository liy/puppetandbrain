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

import {Delay, Move} from './commands';
import {chain} from './commands/utils';
import Classier from './Classifier';


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

let m1 = new Move({x: 100, y: 100}, 1000);
let m2 = new Move({x: 400, y: 400}, 2000);
cow.cmd.add(m1);
m1.add(m2)
cow.cmd.run();