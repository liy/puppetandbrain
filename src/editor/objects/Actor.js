const filters = require('pixi-filters');
import Entity from './Entity';
import mixin from '@/utils/mixin';
import EventEmitter from '@/utils/EventEmitter';
import Brain from '../nodes/Brain';
import ActorSelection from './ActorSelection';
import Matrix from '../math/Matrix';
import Vec2 from '../math/Vec2';
import PropertyList from '../data/PropertyList';
import { aroundAt } from '@/utils/utils';
import DataType from '../data/DataType';
import ContextMenu from '../ui/ContextMenu';

export default class Actor extends EventEmitter
{
  constructor(id, activity) {
    super();
    this.activity = activity;

    this.properties = new PropertyList(this);

    // create an entry in the reference look up
    this.id = this.lookUp.addActor(this, id);

    this.pointerRelease = this.pointerRelease.bind(this)
    this.mouseDragMove = this.mouseDragMove.bind(this);
    this.touchDragMove = this.touchDragMove.bind(this)

    this.selected = false;
    this._clicks = 0;

    this.selectOutline = new filters.OutlineFilter(4, 0xc95ce8)
    this.hoverOutline = new filters.OutlineFilter(3, 0xdbace8)

    // transform for the components
    // also be able to manipulate in the node graph property.
    this.position = new Vec2(0, 0);
    // in radian
    this.rotation = 0;
    this.scale = new Vec2(1, 1);
    this.matrix = new Matrix();

    mixin(this, new Entity());

    this.activity.on('game.prestart', this.gamePrestart, this);
    this.activity.on('game.stop', this.gameStop, this);
  }

  /**
   * Only used when importing individual actor.
   * @param {*} pod Actor pod
   */
  preload(pod) {

  }

  init(pod={}) {
    Object.defineProperties(this, {
      "puppetID": {
        value: pod.puppetID || null,
        writable: false
      },
      "libDir": {
        value: pod.libDir || "library/puppets",
        writable: false
      },
      "libFiles": {
        value: pod.libFiles || [],
        writable: false
      },
      "myPuppetID": {
        value: pod.myPuppetID || null,
        writable: false
      },
    });

    this.name = pod.name || 'Puppet';
    
    let pos = pod.position || { x: 0, y: 0 };
    this.position = new Vec2(pos);
    this.rotation = pod.rotation || 0;
    this.scale = new Vec2(pod.scale || {x:1,y:1});

    // Create empty brain but with exisitng ID if there is one.
    // in the future I might allow actors to sharing same brain.
    // therefore, I decide to use separated step to populate the 
    // content of the brain.
    this.brain = new Brain(this, pod.brainID);
  }

  destroy() {
    for(let component of this.components) {
      this.removeComponent(component.name);
      component.destroy();
    }
    this.lookUp.removeActor(this.id);
    document.removeEventListener('touchmove', this.touchDragMove);
    document.removeEventListener('mousemove', this.mouseDragMove);
    document.removeEventListener('mouseup', this.pointerRelease);

    this.activity.off('game.prestart', this.gamePrestart, this);
    this.activity.off('game.stop', this.gameStop, this);

    this.brain.destroy();

    console.log('destroy', this)
  }

  get stage() {
    return this.activity.stage;
  }

  get lookUp() {
    return this.activity.lookUp
  }

  get resources() {
    return this.activity.resources;
  }

  hitTest(x, y) {
    // TODO: override me 
    return false;
  }

  gamePrestart() {
    this.initialState = {
      position: this.position.pod(),
      scale: this.scale.pod(),
      rotation: this.rotation
    }

    for(let property of this.properties) {
      this.initialState[property.propertyName] = property.pod();
    }
  }

  gameStop() {
    if(this.initialState) {
      this.position = new Vec2(this.initialState.position);
      this.scale = new Vec2(this.initialState.scale);
      this.rotation = this.initialState.rotation;
    }

    for(let property of this.properties) {
      property.set(this.initialState[property.propertyName]);
    }
  }

  pointerDown(x, y, e) {
    this.select();

    this.offset = {
      x: this.position.x - x,
      y: this.position.y - y
    }

    // release outside
    document.addEventListener('mouseup', this.pointerRelease);
    document.addEventListener('touchend', this.pointerRelease);

    // crete move command, when move update it with new position
    if(!this.activity.playing) this.moveCommand = Commander.create('MoveActor', this);

    document.addEventListener('mousemove', this.mouseDragMove);
    document.addEventListener('touchmove', this.touchDragMove);

    this.emit('pointerdown', this)
    
    if(e.which === '3') {
      ContextMenu.openActorMenu();
    }
  }

  pointerUp(e) {
    document.removeEventListener('touchmove', this.touchDragMove)
    document.removeEventListener('mousemove', this.mouseDragMove);
    document.removeEventListener('mouseup', this.pointerRelease);
    document.removeEventListener('touchend', this.pointerRelease);

    // update entity's new position
    if(this.moveCommand) EditorHistory.push(this.moveCommand.processAndSave());

    // double click to open brain
    setTimeout(() => {
      this._clicks = 0;
    }, 300)
    if(++this._clicks%2 == 0) {
      EditorHistory.push(Commander.create('OpenGraph', this.brain.id).process());
    }

    this.emit('pointerup', this)
  }

  pointerRelease(e) {
    document.removeEventListener('touchmove', this.touchDragMove)
    document.removeEventListener('touchend', this.pointerRelease);
    document.removeEventListener('mouseup', this.pointerRelease);
    document.removeEventListener('mousemove', this.mouseDragMove);
    // update entity's new position
    if(this.moveCommand) EditorHistory.push(this.moveCommand.processAndSave());
  }

  mouseOver(e) {
    this.emit('pointerover', this);
  }

  mouseOut(e) {
    this.emit('pointerout', this);
  }

  mouseDragMove(e) {
    this.position.x = e.clientX + this.offset.x - ActivityManager.stage.offsetX;
    this.position.y = e.clientY + this.offset.y - ActivityManager.stage.offsetY;
  }

  touchDragMove(e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY
    this.position.x = x + this.offset.x - ActivityManager.stage.offsetX;
    this.position.y = y + this.offset.y - ActivityManager.stage.offsetY;
  }

  contextMenu(e) {
    this.activity.emit('contextmenu', {actor:this, event:e});
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
      scale: this.scale.pod(),
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
    if(this.stage.playing) Object.assign(pod, this.initialState);

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
      if(variable.type == DataType.AUDIO || variable.type == DataType.IMAGE) {
        if(variable.data && variable.data.hash) {
          userFiles.push(variable.data);
        }
      }
    }
    
    // properties
    for(let property of this.properties) {
      if(property.type == DataType.AUDIO || property.type == DataType.IMAGE) {
        if(property.data && property.data.hash) {
          userFiles.push(property.data);
        }
      }
    }

    return userFiles;
  }

  get screenX() {
    return this.x + this.stage.offsetX
  }

  get screenY() {
    return this.y + this.stage.offsetY
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