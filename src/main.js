// FIXME: for testing 
// Needs to be removed quite soon!!
// 

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

import html2canvas from 'html2canvas';
import 'pixi-spine';
import './NodeTemplate';
// LookUp is a global window variable, save typing!
import './LookUp'
import './nodes/NodeFactory'
import './objects/ActorFactory'
import './graph/BlockFactory'
import './commands/History'
import './commands/Commander'
import './graph/BrainGraph'
import './Editor'

import ActivityLoader from './ActivityLoader';
import AddActorButton from './ui/AddActorButton';
import DebugButton from './ui/DebugButton';
import BrainButton from './ui/BrainButton';
import ArrayMap from './utils/ArrayMap';


import ImportActors from './ImportActors';
import ExportActors from './ExportActors';
import ChoiceBox from './objects/ChoiceBox'
import PuppetBrowser from './browser/PuppetBrowser';
import ActorSelection from './objects/ActorSelection';
import API from './API';
window.ActorSelection = ActorSelection;
window.API = API;


// prevent default context menu for the whole site
document.addEventListener('contextmenu', e => {
  e.preventDefault();

  console.log(ActorSelection.selected[0]);
});

firebase.initializeApp(FIREBASE_CONFIG);

document.getElementById('app-version').textContent = APP_VERSION;

// Editor.start();
// setTimeout(() => {
//   Editor.stop();
// }, 5000)

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

    

    // let exportActors = new ExportActors();
    // exportActors.start(LookUp.getActors()[0].export())

    new AddActorButton();
    new DebugButton();
    new BrainButton();
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}


function simpleInit() {
  let promises = Editor.stage.actors.map(actor => {
    return actor.loaded;
  })
  promises.push(Commander.create('CreateDemoActor').process())
  
  // start the activity when cow and donkey are loaded
  Promise.all(promises).then(async () => {
    
    let cb = new ChoiceBox();
    cb.init();
    cb.x = 600;
    cb.y = 300;
    Editor.stage.addActor(cb)


    LookUp.getActors()[0].snapshot().then(canvas => {
      // canvas.toBlob(blob => {
      //   LookUp.uploadBlob(blob)
      // })
    })

    new AddActorButton();
    new DebugButton();
    new BrainButton();
    // serialize everything before game start
    console.log('%c Activity %o ', 'color: white; background-color: black', LookUp.pod());
  })
}


// TODO: to be replaced by share API
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