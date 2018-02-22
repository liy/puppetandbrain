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

var autoTutorial = async function(req, event, next){
  if(!window.localStorage.getItem('animate-a-puppet')) {
    router.navigate(`/tutorials/animate-a-puppet`);
    event.preventDefault(); // Stops event handler
  }
}

// activity
router.get('editor/creations/:id', async req => {
  await import('pixi.js');
  await import('./editor')

  let chip = notc.notify('loading, please wait...');
  await Activity.load(req.params.id);
  UIController.addBtn.enabled = true;
  chip.fadeOut();
})

// dynamically load tutorials
router.get('/tutorials/:tutorial', async req => {
  await import('pixi.js');
  await import('./editor');
  
  UIController.addBtn.enabled = true;

  const tutorial = (await import(`./tutorials/${req.params.tutorial}`)).default;
  tutorial.start();
})

router.get('/editor', autoTutorial, async req => {
  await import('pixi.js');
  await import('./editor');

  UIController.stageMode();

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