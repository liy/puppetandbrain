import Entity from './Entity';
import mixin from '../utils/mixin';
import EventEmitter from '../utils/EventEmitter';
import TextComponent from '../components/TextComponent';
import Brain from '../nodes/Brain';
import ActorSelection from './ActorSelection';
import Variable from '../data/Variable';
import Matrix from '../math/Matrix';
import Vec2 from '../math/Vec2';
import PropertyList from '../data/PropertyList';
import { aroundAt } from '../utils/utils';
import DataType from '../data/DataType';

export default class Actor extends EventEmitter
{
  constructor(id) {
    super();

    this.properties = new PropertyList(this);

    // create an entry in the reference look up
    this.id = LookUp.addActor(this, id);

    this.pointerRelease = this.pointerRelease.bind(this)
    this.mouseDragMove = this.mouseDragMove.bind(this);
    this.touchDragMove = this.touchDragMove.bind(this)

    this.selected = false;
    this._clicks = 0;

    // transform for the components
    // also be able to manipulate in the node graph property.
    this.position = new Vec2(Editor.stage.stageWidth/2, Editor.stage.stageHeight/2);
    // in radian
    this.rotation = 0;
    this.scale = {
      x: 1,
      y: 1
    }
    this.matrix = new Matrix();

    mixin(this, new Entity());

    Editor.on('game.prestart', this.gamePrestart, this);
    Editor.on('game.stop', this.gameStop, this);
  }

  preload(pod) {

  }

  init(pod={}) {
    Object.defineProperties(this, {
      "puppetID": {
        value: pod.puppetID || null,
        writable: false
      },
      "libDir": {
        value: pod.libDir,
        writable: false
      },
      "libFiles": {
        value: pod.libFiles,
        writable: false
      },
      "myPuppetID": {
        value: pod.myPuppetID || null,
        writable: false
      },
    });

    this.name = pod.name || 'Puppet';
    
    let pos = pod.position || { x: aroundAt(Editor.stage.stageWidth/2), y: aroundAt(Editor.stage.stageHeight/2) };
    this.position = new Vec2(pos);
    this.rotation = pod.rotation || 0;
    this.scale = pod.scale || {x:1,y:1}

    // Create empty brain but with exisitng ID if there is one.
    // in the future I might allow actors to sharing same brain.
    // therefore, I decide to use separated step to populate the 
    // content of the brain.
    this.brain = new Brain(this, pod.brainID);
  }

  destroy() {
    this.removeComponents();
    LookUp.removeActor(this.id);
    document.removeEventListener('touchmove', this.touchDragMove);
    document.removeEventListener('mousemove', this.mouseDragMove);
    document.removeEventListener('mouseup', this.pointerRelease);

    Editor.off('game.prestart', this.gamePrestart, this);
    Editor.off('game.stop', this.gameStop, this);

    this.brain.destroy();

    console.log('destroy', this)
  }

  gamePrestart() {
    this.initialState = {
      position: this.position.clone(),
      scale: {
        ...this.scale
      },
      rotation: this.rotation
    }

    for(let descriptor of this.properties) {
      this.initialState[descriptor.property] = this[descriptor.property];
    }
  }

  gameStop() {
    if(this.initialState) {
      this.position = this.initialState.position;
      this.scale = {...this.initialState.scale};
      this.rotation = this.initialState.rotation;
    }
    for(let descriptor of this.properties) {
      this[descriptor.property] = this.initialState[descriptor.property];
    }
  }

  pointerDown(x, y) {
    this.select();

    this.offset = {
      x: this.position.x - x,
      y: this.position.y - y
    }

    // release outside
    document.addEventListener('mouseup', this.pointerRelease);
    document.addEventListener('touchend', this.pointerRelease);

    // crete move command, when move update it with new position
    if(!Editor.playing) this.moveCommand = Commander.create('MoveActor', this);

    document.addEventListener('mousemove', this.mouseDragMove);
    document.addEventListener('touchmove', this.touchDragMove);

    this.emit('pointerdown', this)
  }

  pointerUp(e) {
    document.removeEventListener('touchmove', this.touchDragMove)
    document.removeEventListener('mousemove', this.mouseDragMove);
    document.removeEventListener('mouseup', this.pointerRelease);
    document.removeEventListener('touchend', this.pointerRelease);

    // update entity's new position
    if(this.moveCommand) History.push(this.moveCommand.processAndSave());

    // double click to open brain
    setTimeout(() => {
      this._clicks = 0;
    }, 300)
    if(++this._clicks%2 == 0) {
      History.push(Commander.create('OpenGraph', this.brain.id).process());
    }

    this.emit('pointerup', this)
  }

  pointerRelease(e) {
    document.removeEventListener('touchmove', this.touchDragMove)
    document.removeEventListener('touchend', this.pointerRelease);
    document.removeEventListener('mouseup', this.pointerRelease);
    document.removeEventListener('mousemove', this.mouseDragMove);
    // update entity's new position
    if(this.moveCommand) History.push(this.moveCommand.processAndSave());
  }

  mouseOver(e) {
    this.emit('pointerover', this);
  }

  mouseOut(e) {
    this.emit('pointerout', this);
  }

  mouseDragMove(e) {
    this.position.x = e.clientX + this.offset.x - Editor.stage.offsetX;
    this.position.y = e.clientY + this.offset.y - Editor.stage.offsetY;
  }

  touchDragMove(e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY
    this.position.x = x + this.offset.x - Editor.stage.offsetX;
    this.position.y = y + this.offset.y - Editor.stage.offsetY;
  }

  select() {
    ActorSelection.set(this);
    this.selected = true;

    // TODO: override this to make selection box
  }

  deselect() {
    ActorSelection.remove(this);
    this.selected = false;
  }

  updateTransform() {
    this.matrix.identity();
    this.matrix.rotate(this.rotation)
    this.matrix.scale(this.scale.x, this.scale.y);
    this.matrix.translate(this.position.x, this.position.y);

    for(let component of this.components) {
      component.updateTransform();
    }
  }

  get className() {
    return this.__proto__.constructor.name;
  }

  set x(x) {
    this.position.x = x;
  }

  get x() {
    return this.position.x;
  }

  set y(y) {
    this.position.y = y;
  }

  get y() {
    return this.position.y;
  }

  get deletable() {
    return true;
  }

  export() {
    let data = {
      ...this.pod(),
      ...this.brain.export(data)
    }
    
    return data
  }

  pod(detail=false) {
    let pod = {
      // serverside, and assets preloading related
      puppetID: this.puppetID,
      libDir: this.libDir,
      libFiles: this.libFiles,
      myPuppetID: this.myPuppetID,
      userFiles: this.getUserFiles(),

      // game play related
      className: this.className,
      id: this.id,
      position: this.position.pod(),
      scale: {...this.scale},
      rotation: this.rotation,
      name: this.name,
      brainID: this.brain.id,
      components: this.components.map((name, component) => {
        return component.pod();
      }),
      properties: this.properties.pod(),
    }

    // FIXME: find a better way to handle saving
    // if game still playing, override pod with initial state
    if(Editor.playing) Object.assign(pod, this.initialState);

    if(detail) {
      pod.brain = this.brain.pod(detail);
    }

    return pod;
  }

  snapshot() {
    
  }

  getUserFiles() {
    let userFiles = [];
    // local memory files
    for(let node of this.brain.nodes) {
      let nodeUserFiles = node.getUserFiles();
      if(nodeUserFiles) {
        userFiles = userFiles.concat(nodeUserFiles);
      }
    }
    // brain variable user files
    for(let variable of this.brain.variables) {
      if(variable.type == DataType.AUDIO) {
        userFiles.push(variable.data);
      }
    }
    return userFiles;
  }

  get screenX() {
    return this.x + Editor.stage.offsetX
  }

  get screenY() {
    return this.y + Editor.stage.offsetY
  }

  createFileRefs() {
    let refs = {};
    for(let node of this.brain.nodes) {
      for(let entry of node.userFiles) {
        refs[entry.fileID] = true;
      }
    }
    return refs;
  }
}