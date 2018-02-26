import ArrayMap from '@/utils/ArrayMap'
import ActorSelection from './objects/ActorSelection';
import EventEmitter from '@/utils/EventEmitter';

export default class Stage extends EventEmitter
{
  constructor(element, canvas) {
    super();
    this.element = element
    this.canvas = canvas;

    this.actors = new ArrayMap();

    this.container = new PIXI.Container();

    this.backStage = [];

    this.renderer = PIXI.autoDetectRenderer({
      autoStart: true,
      width: canvas.width,
      height: canvas.height,
      view: canvas,
      transparent: true,
      antialias: true
    });
    
    // For deselection
    let catcher = new PIXI.Graphics();
    catcher.interactive = true;
    catcher.beginFill(0, 0);
    catcher.drawRect(0, 0, canvas.width, canvas.height);
    catcher.endFill();
    this.addChild(catcher);
    catcher.on('mousedown', ActorSelection.deselectAll, ActorSelection);

    this.loop = this.loop.bind(this);
    PIXI.ticker.shared.add(this.loop);
  }

  get stageWidth() {
    return this.canvas.width;
  }

  get stageHeight() {
    return this.canvas.height;
  }
  
  loop(delta) {
    this.emit('tick', {delta, deltaTime:delta/60});
    this.updateTransform();
    this.renderer.render(this.container);
  }

  updateTransform(delta, deltaTime) {
    for(let actor of this.actors) {
      actor.updateTransform(delta, deltaTime);
    }
  }

  addActor(actor) {
    // call update transform immeditately
    // so it is up to date with the transform even without waiting
    // for the next updateTransform() call
    actor.updateTransform();
    this.actors.set(actor.id, actor);
    actor.onStage();

    this.emit('stage.actor.added', actor);
  }

  removeActor(actor) {
    this.actors.remove(actor.id);
    actor.offStage();

    this.emit('stage.actor.removed', actor);
  }

  addChild(child) {
    return this.container.addChild(child);
  }

  removeChild(child) {
    return this.container.removeChild(child);
  }

  clear() {
    let keys = this.actors.keys.concat();
    for(let key of keys) {
      let actor = this.actors.get(key);
      this.removeActor(actor);
      actor.destroy();
    }
  }

  set blurEnabled(v) {
    if(v) {
      this.container.filters = [new PIXI.filters.BlurFilter(2, 1)];
      document.getElementById('stage-overlayer').classList.add('blur');
    }
    else {
      this.container.filters = [];
      document.getElementById('stage-overlayer').classList.remove('blur');
    }
  }

  get numActors() {
    return this.actors.length;
  }

  get offsetX() {
    return this.element.offsetLeft
  }

  get offsetY() {
    return this.element.offsetTop
  }
}