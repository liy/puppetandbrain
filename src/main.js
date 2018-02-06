// custom event polyfill
(function () {
  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();


// favicons
require("./assets/favicon-192.png")
require('./manifest.json')

// imports
require('./main.scss')
import './ui/Tooltip.scss'

import 'whatwg-fetch';
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
import './ui/UIController';

import './resources/Resource';
import './Activity';
import ActivityLoader from './ActivityLoader';
import ArrayMap from './utils/ArrayMap';

import ExportActor from './ExportActors';
import ChoiceBox from './objects/ChoiceBox'
import PuppetBrowser from './browser/PuppetBrowser';
import ActorSelection from './objects/ActorSelection';
import notc from './ui/NotificationControl';
import API from './API';
import Menu from './ui/Menu';

var menu = new Menu();

document.getElementById('app-version').textContent = APP_VERSION;

window.ActorSelection = ActorSelection;
window.API = API;

import Grapnel from 'grapnel'
import { setTimeout } from "timers";
window.router = new Grapnel({pushState:true});

// prevent default context menu for the whole site
document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

firebase.initializeApp(FIREBASE_CONFIG);

function signedIn(user) {
  console.log('signed in')
  window.CurrentUser = user;
  UIController.stageMode();

  // activity
  router.get('/creations/:id', async req => {
    let chip = notc.notify('loading, please wait...');
    await Activity.load(req.params.id);
    UIController.addBtn.enabled = true;
    chip.fadeOut();
  })

  // dynamically load tutorials
  router.get('/tutorials/:tutorial', async req => {
    UIController.addBtn.enabled = true;

    const tutorial = (await import(`./tutorials/${req.params.tutorial}`)).default;
    tutorial.start();
  })

  router.get('/', req => {
    if(!window.localStorage.getItem('animate-a-puppet')) {
      router.navigate(`/tutorials/animate-a-puppet`);
      return;
    }

    Activity.new();
    UIController.addBtn.enabled = true;
  })

  router.get('/about', (req, e) => {
    
  })
  
  router.get('/*', (req, e) => {
    if(!e.parent()){
      console.log(404)
      // Handle 404
    }
  })
  
}

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
    signedIn(user);
    // LookUp.user = user;
  }
  // sign out
  else {
    // LookUp.user = null;
  }
})