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


  // start the activity when cow and donkey are loaded
  Promise.all([cow.loaded, donkey.loaded]).then(() => {
    // serialize everything before game start
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}

init();

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

// load();

document.addEventListener('keydown', (e) => {
  if(e.key == 'F6' || e.key == 'F4') {
    e.preventDefault();
    LookUp.toggle();
  }
})