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
require('./Stage')

import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';

import ActivityLoader from './ActivityLoader';
import AddActorButton from './ui/AddActorButton';

firebase.initializeApp({
  apiKey: "AIzaSyA1MlcE35XJjV9qWmuojlL71y1AlKsNwPQ",
  authDomain: "puppet-brain.firebaseapp.com",
  databaseURL: "https://puppet-brain.firebaseio.com",
  projectId: "puppet-brain",
  storageBucket: "puppet-brain.appspot.com",
  messagingSenderId: "392290034997"
});

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
  // await loader.load(require('./assets/activity.json'))
  loader.parse(snapshot.data())
  LookUp.setActivityID(activityID);

  new AddActorButton();

  let promises = LookUp.getActors().map(actor => {
    return actor.loaded;
  })

  Promise.all(promises).then(() => {
    let addActorButton = new AddActorButton();
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}


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

  new AddActorButton();

  let promises = Stage.actors.map(actor => {
    return actor.loaded;
  })
  // start the activity when cow and donkey are loaded
  Promise.all(promises).then(() => {
    // serialize everything before game start
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}


// prevent default context menu for the whole site
document.addEventListener('contextmenu', event => event.preventDefault());


let idDiv = document.getElementById('activity-id');
idDiv.addEventListener('mousedown', e => {
  e.preventDefault();
  let range = document.createRange();
  range.selectNode(idDiv);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
})
// idDiv.addEventListener("copy", e => {
//   e.preventDefault();
//   console.log('!!!')
//   if (e.clipboardData) {
//     e.clipboardData.setData("text/plain", idDiv.textContent);
//     console.log(e.clipboardData.getData("text"))
//   }
// });

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

