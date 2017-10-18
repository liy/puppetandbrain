// for testing
require('pixi-spine');

// require('./assets/cow/cow.atlas')
// require('./assets/cow/cow.png')
// require('./assets/cow/cow2.png')
// require('./assets/cow/cow3.png')
// require('./assets/cow/cow.json')



import SpineObject from './SpineObject';
import SpriteObject from './SpriteObject';
import Stage from './Stage';

import GizmoComponent from './components/GizmoComponent'


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

var stage = new Stage(renderer.width, renderer.height);
function render() {
  // console.log('render')
  renderer.render(stage);
  // console.log('')
}
PIXI.ticker.shared.add(render);


window.cow = new SpineObject(require('./assets/cow/info.json'));
cow.setAnimation('walk');
cow.getAnimations().then(animations => {
  console.log(animations)
})
cow.x = 400;
cow.y = 300;
stage.addChild(cow)
