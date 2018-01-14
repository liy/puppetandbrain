// FIXME: for testing 
// Needs to be removed quite soon!!
require('pixi-spine');
require('./assets/cow/cow.atlas')
require('./assets/cow/cow.png')
require('./assets/cow/cow2.png')
require('./assets/cow/cow3.png')
require('./assets/cow/cow.json')
require('./assets/cow/walk-interact-cow-1.mp3')
require('./assets/cow/cow-walk.mp3')
require('./assets/cow/attention-cow-2.mp3')
require('./assets/cow/attention-cow-1.mp3')
require('./assets/cow/walk-interact-cow-2.mp3')

require('./assets/donkey/donkey.atlas')
require('./assets/donkey/donkey.png')
require('./assets/donkey/donkey2.png')
require('./assets/donkey/donkey.json')
require('./assets/donkey/walk-interact-donkey-1.mp3')
require('./assets/donkey/donkey-walk.mp3')
require('./assets/donkey/attention-donkey-1.mp3')
require('./assets/donkey/walk-interact-donkey-2.mp3')

require('./assets/chicken/chicken.atlas')
require('./assets/chicken/chicken.png')
require('./assets/chicken/chicken2.png')
require('./assets/chicken/chicken.json')
require('./assets/chicken/attention-chicken-2.mp3')
require('./assets/chicken/chicken-walk.mp3')
require('./assets/chicken/walk-chicken-1.mp3')
require('./assets/chicken/walk-chicken-2.mp3')
require('./assets/chicken/walk-chicken-3.mp3')
require('./assets/chicken/attention-chicken-1.mp3')

require('./assets/horse/horse.atlas')
require('./assets/horse/horse.png')
require('./assets/horse/horse2.png')
require('./assets/horse/horse.json')
require('./assets/horse/horse-walk.mp3')
require('./assets/horse/walk-horse-1.mp3')
require('./assets/horse/walk-horse-2.mp3')
require('./assets/horse/walk-interact-horse-1.mp3')
require('./assets/horse/walk-interact-horse-2.mp3')
require('./assets/horse/attention-horse.mp3')
require('./assets/horse/attention-horse-1.mp3')

require('./assets/pig/pig.atlas')
require('./assets/pig/pig.png')
require('./assets/pig/pig2.png')
require('./assets/pig/pig.json')
require('./assets/pig/attention-pig-1.mp3')
require('./assets/pig/pig-walk.mp3')
require('./assets/pig/walk-interact-pig-1.mp3')
require('./assets/pig/walk-interact-pig-2.mp3')
require('./assets/pig/attention-pig.mp3')

require('./assets/sheep/sheep.atlas')
require('./assets/sheep/sheep.png')
require('./assets/sheep/sheep2.png')
require('./assets/sheep/sheep.json')
require('./assets/sheep/attention-sheep-2.mp3')
require('./assets/sheep/sheep-walk.mp3')
require('./assets/sheep/walk-interact-sheep-1.mp3')
require('./assets/sheep/walk-interact-sheep-2.mp3')
require('./assets/sheep/attention-sheep-1.mp3')

require('./assets/duck/duck.atlas')
require('./assets/duck/duck.json')
require('./assets/duck/duck.png')
require('./assets/duck/duck2.png')
require('./assets/duck/duck-walk.mp3')
require('./assets/duck/walk-interact-duck-1.mp3')
require('./assets/duck/walk-interact-duck-2.mp3')
require('./assets/duck/attention-duck-1.mp3')

require('./assets/goat/goat.json')
require('./assets/goat/goat.png')
require('./assets/goat/goat2.png')
require('./assets/goat/goat-walk.mp3')
require('./assets/goat/walk-interact-goat-1.mp3')
require('./assets/goat/walk-interact-goat-2.mp3')
require('./assets/goat/attention-goat-1.mp3')
require('./assets/goat/goat.atlas')

require('./assets/cat/cat.json')
require('./assets/cat/cat.png')
require('./assets/cat/cat.atlas')
require('./assets/cat/boing.mp3')

require('./assets/mice/mice.json')
require('./assets/mice/mice.png')
require('./assets/mice/mice.atlas')

//sound
require('./assets/sounds/Jambalaya Loop.mp3')
require('./assets/sounds/Jambalaya Loop.ogg')





// favicons
require("./assets/favicon-192.png")
require('./manifest.json')

// imports
require('./main.scss')

// LookUp is a global window variable, save typing!
import './NodeTemplate';
require('./LookUp');
require('./nodes/NodeFactory');
require('./objects/ActorFactory');
require('./graph/BlockFactory');
require('./commands/History');
require('./commands/Commander');
require('./graph/BrainGraph')
require('./Stage')

import ActivityLoader from './ActivityLoader';
import AddActorButton from './ui/AddActorButton';
import DebugButton from './ui/DebugButton';
import BrainButton from './ui/BrainButton';
import ArrayMap from './utils/ArrayMap';

// let block = new Block();
// block.template({
//   name: 'test',
//   hasIn: true,
//   executionNames: ['out 1', 'out 2'],
//   inputNames: ['pre-acceptance pre-acceptance pre-acceptance pre-acceptance'],
//   outputNames: ['output 1'],
// });
// block.element.style.left = 100+'px';
// block.element.style.top = 100+'px';
// document.body.appendChild(block.element)


firebase.initializeApp(FIREBASE_CONFIG);

document.getElementById('app-version').textContent = APP_VERSION;

console.log(FIREBASE_CONFIG)

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

async function load(activityID) {
  // TODO: get data from firestore
  let snapshot = await firebase.firestore().collection('activities').doc(activityID).get();
  var loader = new ActivityLoader();
  let pod = snapshot.data();
  loader.parse(pod)
  LookUp.setActivityID(activityID);
  LookUp.setOwnerID(pod.userID);

  let promises = LookUp.getActors().map(actor => {
    return actor.loaded;
  })

  Promise.all(promises).then(() => {
    new AddActorButton();
    new DebugButton();
    new BrainButton();
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}


function simpleInit() {
  Commander.create('CreateDemoActor').process();


  let promises = Stage.actors.map(actor => {
    return actor.loaded;
  })
  // start the activity when cow and donkey are loaded
  Promise.all(promises).then(() => {
    new AddActorButton();
    new DebugButton();
    new BrainButton();
    // serialize everything before game start
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}


// prevent default context menu for the whole site
document.addEventListener('contextmenu', event => event.preventDefault());


let idDiv = document.getElementById('activity-id');
idDiv.addEventListener('mousedown', e => {
  e.preventDefault();
  e.stopImmediatePropagation();

  let temp = document.createElement('div');
  temp.style.position = 'absolute';
  temp.style.bottom = '-999px';
  temp.textContent = window.location.href;
  document.body.appendChild(temp)

  let range = document.createRange();
  range.selectNodeContents(temp);
  // https://stackoverflow.com/questions/43260617/selection-addrange-is-deprecated-and-will-be-removed-from-chrome
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');

  document.body.removeChild(temp)

})

// Persist the sign in token in local machine, probably in local storage or something in browser... whatever.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function() {
                  return firebase.auth().signInAnonymously()
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error(errorCode, errorMessage)
                });

firebase.auth().onAuthStateChanged(user => {
  // sign in
  if(user) {
    LookUp.user = user;

    // TODO: check url
    let activityID = window.location.href.split('#')[1];
    if(activityID) {
      load(activityID);
    }
    else {
      simpleInit();
    }
  }
  // sign out
  else {
    LookUp.user = null;
  }
})