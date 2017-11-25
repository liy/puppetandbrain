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

require('./assets/chicken/chicken.atlas')
require('./assets/chicken/chicken.png')
require('./assets/chicken/chicken2.png')
require('./assets/chicken/chicken.json')

require('./assets/horse/horse.atlas')
require('./assets/horse/horse.png')
require('./assets/horse/horse2.png')
require('./assets/horse/horse.json')

require('./assets/pig/pig.atlas')
require('./assets/pig/pig.png')
require('./assets/pig/pig2.png')
require('./assets/pig/pig.json')

require('./assets/sheep/sheep.atlas')
require('./assets/sheep/sheep.png')
require('./assets/sheep/sheep2.png')
require('./assets/sheep/sheep.json')



// imports
require('./index.scss')

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
import Stage from './objects/Stage';

import ActivityLoader from './ActivityLoader';


var canvas = document.getElementById('canvas');

window.renderer = PIXI.autoDetectRenderer({
  autoStart: true,
  width: window.innerWidth-1,
  height: window.innerHeight-1,
  view: canvas,
  transparent: true,
  antialias: true
});

Stage.init(renderer.width, renderer.height);
function render() {
  renderer.render(Stage);
}
PIXI.ticker.shared.add(render);


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


const ACTORS = [
  require('./assets/chicken/chicken.info.json'),
  require('./assets/cow/cow.info.json'),
  require('./assets/donkey/donkey.info.json'),
  require('./assets/horse/horse.info.json'),
  require('./assets/pig/pig.info.json'),
  require('./assets/sheep/sheep.info.json'),
  // require('./assets/cow/cow.info.json'),
  // require('./assets/cow/cow.info.json'),
]

function simpleInit() {
  Commander.create('CreateActor', ACTORS[Math.floor(Math.random()*ACTORS.length)]).process();

  let promises = Stage.actors.map(actor => {
    return actor.loaded;
  })
  // start the activity when cow and donkey are loaded
  Promise.all(promises).then(() => {
    // serialize everything before game start
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}

simpleInit();

let actorAddBtn = document.getElementById('add-actor');
actorAddBtn.addEventListener('mousedown', e => {
  History.push(Commander.create('CreateActor', ACTORS[Math.floor(Math.random()*ACTORS.length)]).process());
})

// prevent default context menu for the whole site
document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', (e) => {
  if(e.key == 'F6' || e.key == 'F4') {
    e.preventDefault();
    LookUp.toggle();
  }
})