import './assets/favicon-192.png';
import './manifest.json';

import API from './API';
window.API = API;

document.getElementById('app-version').textContent = APP_VERSION;

import Grapnel from 'grapnel'
window.router = new Grapnel({pushState:true});

// prevent default context menu for the whole site
// unless it is from canvas, which pixi needs it to handle right click.
document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

firebase.initializeApp(FIREBASE_CONFIG);

async function signedIn(user) {
  console.log('signed in')
  window.CurrentUser = user;

  // activity
  router.get('editor/creations/:id', async req => {
    await import('./editor')

    let chip = notc.notify('loading, please wait...');
    await Activity.load(req.params.id);
    UIController.addBtn.enabled = true;
    chip.fadeOut();
  })

  // dynamically load tutorials
  router.get('/tutorials/:tutorial', async req => {
    await import('./editor')
    
    UIController.addBtn.enabled = true;

    const tutorial = (await import(`./tutorials/${req.params.tutorial}`)).default;
    tutorial.start();
  })

  router.get('/editor', async req => {
    await import('pixi.js');
    await import('./editor');
    UIController.stageMode();
    // if(!window.localStorage.getItem('animate-a-puppet')) {
    //   router.navigate(`/tutorials/animate-a-puppet`);
    //   return;
    // }

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
  }
  // sign out
  else {
    
  }
})