import EditorHistory from './commands/EditorHistory'
import Activity from "./Activity";
import Delay from './access/Delay'
import '@/editor/graph/BlockFactory'
import '@/editor/nodes/NodeFactory'
import './commands/Commander';
import ActivityLoader from "./ActivityLoader";
import Stage from "./Stage";
import ContextMenu from "./ui/ContextMenu";
import EventEmitter from '../utils/EventEmitter';

import store from '@/store';
import BlockBrowser from './browser/BlockBrowser';
import PuppetBrowser from './browser/PuppetBrowser';
import Modal from './ui/Modal';
import ActorSelection from './objects/ActorSelection';
import GraphSelection from './graph/GraphSelection';
import NotificationControl from './ui/NotificationControl';
import SceneManager from './SceneManager';

class HubClass extends EventEmitter
{
  constructor() {
    super();

    // no changes
    this._saved = true;
    
    this.delaySave = new Delay();

    this.sceneManager = new SceneManager()

    // history will be first accessed in HistoryControl.vue component
    // which requires the reference even before hub is installed... 
    // might need to find a better way to solve this
    this.history = new EditorHistory();
  }

  async install(router) {
    this.router = router;
    this.currentUser = await getCurrentUser();

    this.stage = new Stage(document.getElementById('stage'));
    this.stage.startRender();
    console.log('installed')
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

    // nothing to save anymore
    this._saved = true;

    // close any modal
    Modal.close();

    store.commit('resetEditorState');
    console.log('uninstalled')
  }

  // change between /editr to /editr/xxxx simply
  // only difference between clear and uninstall is that in clear, stage does not destroy 
  clear() {
    Hub.history.clear();
    
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
    // nothing to save anymore
    this._saved = true;

    // close any modal
    Modal.close();
    store.commit('resetEditorState');
    console.log('clear')
  }

  create() {
    this.activity = new Activity();
    return this.activity;
  }

  async load(id) {
    this.activity = new Activity();
    this.activityLoader = new ActivityLoader(this.activity);
    try {
      const actorBuffer = await this.activityLoader.start(id);

      // ignore loaded actors
      for(let actor of actorBuffer) {
        this.stage.addActor(actor)
      }
    }
    catch(cancelled) {
      console.log(cancelled);
    }

    return this.activity;
  }

  cancelLoading() {
    if(this.activityLoader) this.activityLoader.cancel('Loading canceled');
  }

  /**
   * Once activity pod and related files refs are updated, no need to load. Just point the 
   * local activity instance to the newly cloned activity by changing the user and activity id.
   * 
   * @returns 
   * @memberof HubClass
   */
  async clone() {
    let pod = await this.activity.clone();
    // once the clone of activity has uploaded to the server,
    // no need to reload, simply update current activity to use the new activity
    // and it owner to be current user
    this.activity.ownerID = this.currentUser.uid;
    this.activity.id = pod.activityID;
    return this.activity;
  }

  async save() {
    // TODO: make a clone instead
    if(this.activity.ownerID !== this.currentUser.uid) {
      return Promise.reject('Not an owner, clone first');
    }

    let userFileRefs = this.activity.getFileRefs();
    this.activity.cleanResource(userFileRefs);

    let pod = this.activity.pod();
    await API.saveActivity(pod, userFileRefs);

    this._saved = true;

    return this.activity;
  }

  // async preload(id) {
  //   let pod = await API.getActivity(id);
  //   let activity = new Activity(pod.activityID, pod.userID);
  //   var loader = new ActivityLoader(activity);
  //   return loader.start(pod);
  // }

  async autoSave() {
    // no need to auto save if it is not the owner
    if(this.activity.ownerID !== this.currentUser.uid) {  
      return;
    }

    // do not auto save when in dev mode
    if(process.env.NODE_ENV !== 'dev' && !store.tutorialMode) {  
      // delay save, just in case user has lots of actions...
      this.delaySave.cancel();
      await this.delaySave.wait(5000);

      // auto save does not clean resource
      // might be ok?
      let fileRefs = this.activity.getFileRefs();

      if(this.activity.isOwner) {
        let pod = this.activity.pod();
        await API.saveActivity(pod, fileRefs);
      }

      // mark saved
      this._saved = true;

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

  // mark save dirty
  dirty() {
    this._saved = false;
  }

  get saved() {
    return this._saved;
  }
}

window.Hub = new HubClass();

// TODO: make a authentication class?
// ensure sign in sign out update CurrentUser variable
firebase.auth().onAuthStateChanged(user => {
  Hub.currentUser = user;
})          
