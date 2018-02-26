import Activity from "./Activity";
import Delay from './access/Delay'
import '@/editor/graph/BlockFactory'
import '@/editor/nodes/NodeFactory'
import './commands/Commander';
import Stage from "./Stage";

class ActivityManager {
  constructor() {
    this.current = null;
    this.delaySave = new Delay();

    this.stage = new Stage();
  }

  temp() {
    const id = firebase.firestore().collection('activities').doc().id;
    this.current = new Activity(id, CurrentUser.uid);
  }

  async save() {
    // TODO: make a clone instead
    if(this.current.ownerID !== CurrentUser.uid) {
      throw new Error('User is not the owner of the activity!')
    }

    let userFileRefs = this.current.getFileRefs();
    this.current.cleanResource(userFileRefs);

    let pod = this.current.pod();
    await API.saveActivity(pod, userFileRefs);

    return this.current;
  }

  async load(id) {
    let pod = await API.getActivity(id);
    this.current = new Activity(pod.activityID, pod.userID);
    var loader = new ActivityLoader(this.current);
    await loader.parse(pod);

    return this.current;
  }

  async preload(id) {
    let pod = await API.getActivity(id);
    let activity = new Activity(pod.activityID, pod.userID);
    var loader = new ActivityLoader(activity);
    await loader.parse(pod);

    return activity;
  }

  async autoSave() {
    // do not auto save when in dev mode
    if(process.env.NODE_ENV !== 'dev') {  
      // delay save, just in case user has lots of actions...
      this.delaySave.cancel();
      await delaySave.wait(5000);

      // auto save does not clean resource
      // might be ok?
      let fileRefs = this.getFileRefs();

      if(this.current.canSave()) {
        let pod = this.current.pod();
        await API.saveActivity(pod, fileRefs);
      }
    }
  }
}

window.ActivityManager = new ActivityManager();