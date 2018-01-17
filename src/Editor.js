import Stage from './Stage';
import EventEmitter from './utils/EventEmitter';

class Editor extends EventEmitter
{
  constructor() {
    super();

    this.loop = this.loop.bind(this);

    this.stage = new Stage();
  }

  init() {
    var canvas = document.getElementById('canvas');
    window.renderer = PIXI.autoDetectRenderer({
      autoStart: true,
      width: window.innerWidth,
      height: window.innerHeight,
      view: canvas,
      transparent: true,
      antialias: true
    });
    
    this.stage.init(renderer.width, renderer.height);
  }

  loop() {
    this.stage.updateTransform();
    renderer.render(this.stage.container);
  }

  start() {
    PIXI.ticker.shared.add(this.loop);
    this.running = true;
    this.emit('game.prestart')
    this.emit('game.start')
  }

  stop() {
    PIXI.ticker.shared.remove(this.loop);
    this.running = false;
    this.emit('game.stop')
  }

  toggle() {
    if(this.running) {
      this.stop();
    }
    else {
      this.start();
    }
  }
}

let editor = new Editor();
editor.init();
window.Editor = editor;