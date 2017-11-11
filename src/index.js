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
import { Accessor, Data, Property } from './Data';


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

  let animation = new Animation();
  animation.init({
    actor: donkey,
    name: 'walk'
  })
  let onDonkeyExcit = new Function();
  onDonkeyExcit.init({
    actor: donkey,
    name: 'playAnimation'
  })
  onDonkeyExcit.inputs.add('animationName', new Data())
  onDonkeyExcit.chain(animation);

  // Let the animation task name input referencing the function's animaitonName input data
  animation.inputs.set('name', onDonkeyExcit.inputs.get('animationName'));
  

  
  // Cow
  var cow = new SpineActor(require('./assets/cow/cow.info.json'));
  cow.scale = {
    x: 0.5,
    y: 0.5
  }
  cow.x = 0;
  cow.y = 768/2;
  Stage.addActor(cow)

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

  let group = new Group()
  group.init({
    actor: cow,
  })

  let trace = new Trace();
  trace.init({
    actor: cow,
    text: 'debug print'
  })
  group.add(staticAnimation, wait, trace);

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

  onDonkeyExcit.inputs.update('animationName', 'interactive');
  startTask.chain(group, walkAnimation, tween)
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
