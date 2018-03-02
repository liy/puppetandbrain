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

class HubClass extends EventEmitter
{
  constructor() {
    super();
    
    this.delaySave = new Delay();

    // history will be first accessed in HistoryControl.vue component
    // which requires the reference even before hub is installed... 
    // might need to find a better way to solve this
    this.history = new EditorHistory();
  }

  async install(activityID) {
    this.currentUser = await getCurrentUser();

    this.stage = new Stage(document.getElementById('stage'));

    if(activityID) {
      await this.load(activityID);
    }
    else {
      await this.create();
    }

    this.stage.startRender();
    console.log('install')
  }

  uninstall() {
    Hub.history.clear();
    
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
    console.log('uninstall')
  }

  create() {
    const id = firebase.firestore().collection('activities').doc().id;
    this.activity = new Activity(id, this.currentUser.uid);
    return this.activity;
  }

  async save() {
    // TODO: make a clone instead
    if(this.activity.ownerID !== this.currentUser.uid) {
      throw new Error('User is not the owner of the activity!')
    }

    let userFileRefs = this.activity.getFileRefs();
    this.activity.cleanResource(userFileRefs);

    let pod = this.activity.pod();
    console.log(pod)
    await API.saveActivity(pod, userFileRefs);

    return this.activity;
  }

  async load(id) {
    let pod = await API.getActivity(id);
    this.activity = new Activity(pod.activityID, pod.userID);
    var loader = new ActivityLoader(this.activity);
    let actorBuffer = await loader.start(pod);

    for(let actor of actorBuffer) {
      this.stage.addActor(actor)
    }

    return this.activity;
  }

  // async preload(id) {
  //   let pod = await API.getActivity(id);
  //   let activity = new Activity(pod.activityID, pod.userID);
  //   var loader = new ActivityLoader(activity);
  //   return loader.start(pod);
  // }

  async autoSave() {
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
}

window.Hub = new HubClass();

// TODO: make a authentication class?
// ensure sign in sign out update CurrentUser variable
firebase.auth().onAuthStateChanged(user => {
  Hub.currentUser = user;
})          
