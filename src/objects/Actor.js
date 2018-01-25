import Entity from './Entity';
import mixin from '../utils/mixin';
import EventEmitter from '../utils/EventEmitter';
import TextComponent from '../components/TextComponent';
import Brain from '../nodes/Brain';
import ActorSelection from './ActorSelection';
import Variable from '../data/Variable';
import Matrix from '../math/Matrix';
import PropertyList from '../data/PropertyList';

export default class Actor extends EventEmitter
{
  constructor(id) {
    super();

    this.properties = new PropertyList(this);

    // create an entry in the reference look up
    this.id = LookUp.addActor(this, id);

    this.relaseOutside = this.relaseOutside.bind(this)
    this.dragMove = this.dragMove.bind(this);

    this.selected = false;
    this._clicks = 0;

    // transform for the components
    // also be able to manipulate in the node graph property.
    this.position = {
      x: 0,
      y: 0,
    }
    // in radian
    this.rotation = 0;
    this.scale = {
      x: 1,
      y: 1
    }
    this.matrix = new Matrix();


    // release outside
    document.addEventListener('mouseup', this.relaseOutside);

    mixin(this, new Entity());

    Editor.on('game.prestart', this.gamePrestart, this);
    Editor.on('game.stop', this.gameStop, this);
  }

  preload(pod) {

  }

  init(pod={}) {
    Object.defineProperties(this, {
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
    // user uploaded file names
    this.userFiles = pod.userFiles || [];

    this.name = pod.name || 'Puppet';
    
    this.position = pod.position || {x:0,y:0};
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
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.relaseOutside);

    Editor.off('game.prestart', this.gamePrestart, this);
    Editor.off('game.stop', this.gameStop, this);

    this.brain.destroy();
  }

  gamePrestart() {
    this.initialState = {
      position: {
        ...this.position
      },
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
      this.position = {...this.initialState.position} 
      this.scale = {...this.initialState.scale};
      this.rotation = this.initialState.rotation;
    }
    for(let descriptor of this.properties) {
      this[descriptor.property] = this.initialState[descriptor.property];
    }
  }

  mouseDown(mouseX, mouseY) {
    this.select();

    this.offset = {
      x: this.position.x - mouseX,
      y: this.position.y - mouseY
    }

    // crete move command, when move update it with new position
    if(!Editor.playing) this.moveCommand = Commander.create('MoveActor', this);

    document.addEventListener('mousemove', this.dragMove);
  }

  mouseUp(e) {
    document.removeEventListener('mousemove', this.dragMove);

    // double click to open brain
    setTimeout(() => {
      this._clicks = 0;
    }, 300)
    if(++this._clicks%2 == 0) {
      History.push(Commander.create('OpenGraph', this.brain.id).process());
    }
  }

  relaseOutside() {
    document.removeEventListener('mousemove', this.dragMove);
    // update entity's new position
    if(this.moveCommand) History.push(this.moveCommand.processAndSave());
  }

  mouseOver(e) {
    this.emit('pointerover', this);
  }

  mouseOut(e) {
    this.emit('pointerout', this);
  }

  dragMove(e) {
    this.position.x = e.clientX + this.offset.x;
    this.position.y = e.clientY + this.offset.y;
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

  export(data={}) {
    data.actors = data.actors || [];
    data.actors.push(this.id);

    data.store = {
      ...data.store,
      [this.id]: this.pod()
    }
    
    this.brain.export(data);
    return data
  }

  pod(detail=false) {
    let pod = {
      libDir: this.libDir,
      libFiles: this.libFiles,
      myPuppetID: this.myPuppetID,
      userFiles: this.userFiles,

      className: this.className,
      id: this.id,
      position: {...this.position},
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
    for(let node of this.brain.nodes) {
      userFiles = userFiles.concat(node.userFiles);
    }
    return userFiles;
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