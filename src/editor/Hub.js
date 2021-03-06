import EditorHistory from './commands/EditorHistory'
import Activity from "./Activity";
import Delay from './access/Delay'
import '@/editor/graph/BlockFactory'
import '@/editor/nodes/NodeFactory'
import './commands/Commander';
import ActivityLoader from "./ActivityLoader";
import Stage from "./Stage";
import EventEmitter from '../utils/EventEmitter';

import store from '@/store';
import BlockBrowser from './browser/BlockBrowser';
import PuppetBrowser from './browser/PuppetBrowser';
import Modal from './ui/Modal';
import ActorSelection from './objects/ActorSelection';
import GraphSelection from './graph/GraphSelection';
import NotificationControl from './ui/NotificationControl';
import SceneManager from './SceneManager';
import CanvasActor from './objects/CanvasActor';

class HubClass extends EventEmitter
{
  constructor() {
    super();

    this.store = store;
    
    this.delaySave = new Delay();

    this.sceneManager = new SceneManager()

    // history will be first accessed in HistoryControl.vue component
    // which requires the reference even before hub is installed... 
    // might need to find a better way to solve this
    this.history = new EditorHistory();
  }

  install(router) {
    this.router = router;

    // other things can wait until hub is installed
    this.installed = new Promise(async resolve => {
      this.currentUser = await getCurrentUser();

      this.stage = new Stage(document.getElementById('stage'));
      this.stage.startRender();

      this.stage.on('stage.actor.added', () => {
        store.commit('setActors', this.stage.actors.getValues())
      });

      this.stage.on('stage.actor.removed', () => {
        store.commit('setActors', this.stage.actors.getValues())
      });

      console.log('installed')
      resolve();
    })

    return this.installed;
  }

  uninstall() {
    Hub.history.destroy();
    
    // deselect anything
    ActorSelection.deselectAll();
    GraphSelection.deselect();

    // close any opened browser if any
    this.closeBrowser();
    // TODO: save activity before destroy?
    this.activity.destroy();
    this.stage.destroy();
    this.removeAllListeners();

    // close any modal
    Modal.close();

    store.commit('resetEditorState');
    console.log('uninstalled')
  }

  // change between /editr to /editr/xxxx simply
  // only difference between clear and uninstall is that in clear, stage does not destroy 
  clear(clearHistory=true) {
    if(clearHistory) Hub.history.clear();
    
    // deselect anything
    ActorSelection.deselectAll();
    GraphSelection.deselect();
    
    // close the brain graph if opened
    BrainGraph.close();

    // close any opened browser if any
    this.closeBrowser();
    // TODO: save activity before destroy?
    this.activity.destroy();
    this.stage.clear();
    this.removeAllListeners();

    // close any modal
    Modal.close();
    store.commit('resetEditorState');
    console.log('clear')
  }

  create() {
    this.activity = new Activity();
    this.unlock();

    // setup default draw canvas for user to draw on
    this.canvasActor = new CanvasActor(undefined, this.activity);
    this.canvasActor.init();
    this.stage.addActor(this.canvasActor)
    // create default game loop node and added to actor
    NodeFactory.create('GameLoop', this.canvasActor, this.activity);

    return this.activity;
  }

  async load(id) {
    this.activity = new Activity();
    this.activityLoader = new ActivityLoader(this.activity);

    const actorBuffer = await this.activityLoader.start(id);
    for(let actor of actorBuffer) {
      if(actor instanceof CanvasActor) {
        this.canvasActor = actor;
      }
      
      this.stage.addActor(actor)
    }

    return this.activity;
  }

  cancelLoading() {
    if(this.activityLoader) this.activityLoader.cancel();
  }

  /**
   * Once activity pod and related files refs are updated, no need to load. Just point the 
   * local activity instance to the newly cloned activity by changing the user and activity id.
   * 
   * @returns 
   * @memberof HubClass
   */
  async clone(newID) {
    let pod = await this.activity.clone(newID);
    // once the clone of activity has uploaded to the server,
    // no need to reload, simply update current activity to use the new activity
    // and it owner to be current user
    this.activity.ownerID = this.currentUser.uid;
    const activityID = this.activity.id = pod.activityID;
    // clear current activity
    this.clear();
    this.router.push(`/editor/${activityID}`)

    return this.activity;
  }

  share() {
    // if user is owner then you can directly save the activity before share
    if(this.activity.isOwner) {
      this.save().then(activity => {
        this.router.push(`/editor/${activity.id}`)
      })
      return this.activity.id;
    }
    // if user is not owner, but has no edits, this means they purely want to pass
    // on the original activity to other people, 
    else if(!this.history.hasEdits) {
      return this.activity.id;
    }
    // the user is remixing the original activity
    else {
      const activityID = API.generateActivityID();
      this.clone(activityID)
      return activityID;
    }
  }

  async save() {
    if(this.saveLock) return this.activity;
    
    await this.activity.save(true, true);
    return this.activity;
  }

  async autoSave(delay=2000) {
    if(this.saveLock) return;

    // no need to auto save if it is not the owner
    if(!this.activity.isOwner) {  
      return;
    }

    // do not auto save when in dev mode
    if(process.env.NODE_ENV !== 'dev' && !store.state.tutorialMode) {  
      // delay save, just in case user has lots of actions...
      this.delaySave.cancel();
      await this.delaySave.wait(delay);

      // auto save does not clean resource
      // might be ok?
      this.activity.save(false, true);

      this.router.push(`/editor/${this.activity.id}`)
    }
  }

  openBlockBrowser() {
    this.browser = new BlockBrowser();
    return this.browser.open();
  }

  openPuppetBrowser() {
    this.browser = new PuppetBrowser();
    return this.browser.open();
  }

  closeBrowser() {
    if(this.browser) this.browser.close();
  }

  disableSaveAndHistory() {
    console.warn('disableSaveAndHistory')
  }

  enableSaveAndHistory() {
    console.warn('enableSaveAndHistory')
  }

  lock(targets=['saveLock', 'historyLock', 'modeLock', 'deleteLock', 'debugLock', 'addLock']) {
    for(let target of targets) {
      store.commit('lock', {
        target,
        locked: true,
      });
    }
  }

  unlock(targets=['saveLock', 'historyLock', 'modeLock', 'deleteLock', 'debugLock', 'addLock']) {
    for(let target of targets) {
      store.commit('lock', {
        target,
        locked: false,
      });
    }
  }

  runtimeError(error) {
    NotificationControl.notify(error.message).delayFadeoutRemove();
    const actor = Hub.activity.lookUp.get(error.actorID);
    if(actor) {
      BrainGraph.open(actor.brain);
      const block = GraphSelection.selectByID(error.nodeID);

      const inputPin = block.inputPins.get(error.inputID)
      if(inputPin) {
        inputPin.expand()
        inputPin.gadget.focus()
      }
    }
  }

  get historyLock() {
    return store.state.historyLock
  }

  get saveLock() {
    return store.state.saveLock
  }

  openBlockDoc(template) {
    store.commit('openBlockDoc', template);
  }
}

window.Hub = new HubClass();

// TODO: make a authentication class?
// ensure sign in sign out update CurrentUser variable
firebase.auth().onAuthStateChanged(user => {
  Hub.currentUser = user;
})          
