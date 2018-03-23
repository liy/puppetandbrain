import LookUp from './LookUp';
import EventEmitter from '@/utils/EventEmitter'
import Stage from './Stage';
import html2canvas from 'html2canvas';

export default class Activity extends EventEmitter
{
  constructor() {
    super();

    this.id = API.generateActivityID();
    this.ownerID = Hub.currentUser.uid

    this.resources = new Map();
    this.lookUp = new LookUp(this);

    // always dirty when created, so user can save a blank activity if they want to
    this.dirty = true;
  }

  get isOwner() {
    return Hub.currentUser.uid == this.ownerID;
  }

  async save(clearResource=false, updateSnapshot=false) {
    if(!this.isOwner || !this.dirty) return;

    let userFileRefs = this.getFileRefs();
    if(clearResource) this.cleanResource(userFileRefs);

    let snapshot = null;
    if(updateSnapshot) {
      snapshot = await this.snapshot();
    }
    
    return API.saveActivity(this.pod(), userFileRefs, snapshot).then(() => {
      this.dirty = false;
    })
  }

  /**
   * This extract all the necessary information for cloning the activity.
   * Send it to API
   * @param {String} newID the new activity for the cloned activity. If not supplied, brand new id will be generated
   */
  clone(newID=API.generateActivityID()) {
    // generate files and fileRefs together
    let files = {};
    let fileRefs = {}
    for(let actor of this.lookUp.getActors()) {
      let userFiles = actor.getUserFiles()
      for(let fileData of userFiles) {
        // elminate the dupicate user files
        files[`${fileData.hash}.${fileData.ext}`] = {[newID]: true}
        fileRefs[fileData.path] = true;
      }
    }

    let pod = this.lookUp.pod();
    pod.userID = Hub.currentUser.uid;
    pod.activityID = newID;
    return API.cloneActivity(pod, files, fileRefs);
  }

  destroy() {
    super.destroy();
    this.clear();
    this.id = null;
    this.ownerID = null;
  }

  clear() {
    // TODO: clear resources necessary??
    this.resources.clear();
    this.lookUp.clear();
  }

  getFileRefs() {
    // get fileRefs from all actors(local memory of nodes and actor's brain variable)
    // it is used for cronjob to check against to decide whether to remove the actual file.
    //
    // also used for cleaning resource, remove any unused resources
    let fileRefs = {}
    for(let actor of this.lookUp.getActors()) {
      let userFiles = actor.getUserFiles();
      for(let fileData of userFiles) {
        fileRefs[fileData.path] = true;
      }
    }
    return fileRefs;
  }

  cleanResource(fileRefs) {
    let paths = this.resources.keys();
    for(let path of paths) {
      if(!(path in fileRefs)) {
        this.resources.delete(path);
      }
    }
  }

  async snapshot() {
    let texture = Hub.stage.renderer.generateTexture(Hub.stage.container);
    let pixiCanvas = Hub.stage.renderer.extract.canvas(texture);

    const underLayer = document.getElementById('stage-underlayer');
    // draw both over and under layer of the stage
    // TODO: maybe just need a background color?
    // first generate the dom overlay
    const promises = [html2canvas(underLayer, {
      backgroundColor: underLayer.style.backgroundColor,
      allowTaint: true,
    }), html2canvas(document.getElementById('stage-overlayer'), {
      backgroundColor: null,
      allowTaint: true,
    })];

    return Promise.all(promises).then(([underLayerCanvas, overlayCanvas]) => {
      const scale = 0.5;
      let canvas = document.createElement('canvas')
      canvas.width = Hub.stage.stageWidth*scale;
      canvas.height = Hub.stage.stageHeight*scale;

      // scale down the context so we can draw to correct size
      let context = canvas.getContext('2d');
      context.scale(scale, scale);

      context.drawImage(underLayerCanvas, 0, 0)
      // draw the pixi content
      context.drawImage(pixiCanvas, 0, 0)
      // draw dom canvas, which is above pixi canvas
      context.drawImage(overlayCanvas, 0, 0);

      return canvas;
    })
  }

  pod() {
    let pod = this.lookUp.pod();
    pod.userID = this.ownerID;
    pod.activityID = this.id;
    return pod;
  }
}