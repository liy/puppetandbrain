import ArrayMap from '@/utils/ArrayMap'
import EventEmitter from '@/utils/EventEmitter';
import ActorContextMenu from './ui/ActorContextMenu';
import Mouse from './access/Mouse';

export default class extends EventEmitter
{
  constructor(stageElement) {
    super();

    this.element = stageElement
    this.overlayer = this.element.querySelector('#stage-overlayer');
    this.canvas = this.element.querySelector('#canvas');
    this.maskCircle = document.getElementById('mask-circle');

    this.actors = new ArrayMap();
    this.container = new PIXI.Container();

    // mouse has to be created before renderer. 
    // The reasons is that, I want to allow user to query the updated mouse(touch) position.
    // This requires manual update of the mouse position before all the pixi.js's interactive events.
    this.mouse = new Mouse(this);

    this.renderer = PIXI.autoDetectRenderer({
      autoStart: true,
      width: canvas.width,
      height: canvas.height,
      view: canvas,
      transparent: true,
      antialias: true
    });

    this.mouse.registerRenderer(this.renderer);
    
    this.contextMenu = new ActorContextMenu();

    this.loop = this.loop.bind(this);
  }

  curtainOpen() {
    this.maskCircle.classList.remove('circle-mask-close');
    this.maskCircle.classList.add('circle-mask-open');

    const finished = () => {
      this.element.classList.remove('masking');
    }
    
    this.maskCircle.addEventListener('animationend', finished, {once: true})
    this.maskCircle.addEventListener('webkitAnimationEnd', finished, {once: true})
    this.maskCircle.addEventListener('MSAnimationEnd', finished, {once: true})
  }

  curtainClose() {
    return new Promise(resolve => {
      this.element.classList.add('masking')
      this.maskCircle.classList.add('circle-mask-close');
      this.maskCircle.classList.remove('circle-mask-open');

      this.maskCircle.addEventListener('animationend', resolve, {once: true})
      this.maskCircle.addEventListener('webkitAnimationEnd', resolve, {once: true})
      this.maskCircle.addEventListener('MSAnimationEnd', resolve, {once: true})
    })
  }

  destroy() {
    PIXI.ticker.shared.remove(this.loop);
    this.contextMenu.destroy();
    this.renderer.destroy();
    this.clear();
  }

  startRender() {
    PIXI.ticker.shared.add(this.loop);
  }

  pauseRender() {
    PIXI.ticker.shared.remove(this.loop);
  }
  
  loop(delta) {
    if(this.playing) Hub.activity.emit('tick', {delta, deltaTime:delta/60});
    this.updateTransform();
    this.renderer.render(this.container);
  }

  updateTransform(delta, deltaTime) {
    for(let actor of this.actors) {
      actor.updateTransform(delta, deltaTime);
    }
  }

  addActor(actor) {
    actor.onStage();
    // call update transform immeditately
    // so it is up to date with the transform even without waiting
    // for the next updateTransform() call
    actor.updateTransform();
    this.actors.set(actor.id, actor);

    this.emit('stage.actor.added', actor);
  }

  sort(actors) {
    this.actors.clear();
    for(const actor of actors) {
      this.actors.set(actor.id, actor)
      actor.sortDepth();
    }
  }

  removeActor(actor) {
    // console.log('remove actor')
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
      this.overlayer.classList.add('blur');
    }
    else {
      this.container.filters = [];
      this.overlayer.classList.remove('blur');
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

  start() {
    this.playing = true;
    this.mouse.gamePreStart();
    Hub.activity.emit('game.prestart')
    Hub.activity.emit('game.start')
  }

  stop() {
    this.playing = false;
    Hub.activity.emit('game.stop')
    this.mouse.gameStop();
  }

  toggle() {
    if(this.playing) {
      this.stop();
    }
    else {
      this.start();
    }
  }

  get stageWidth() {
    return this.canvas.width;
  }

  get stageHeight() {
    return this.canvas.height;
  }
}