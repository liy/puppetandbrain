import Stage from './Stage';
import EventEmitter from '@/utils/EventEmitter';
import Mouse from './access/Mouse';
import './ui/ContextMenu';
import ContextMenu from './ui/ContextMenu';


class Editor extends EventEmitter
{
  constructor() {
    super();

    this.loop = this.loop.bind(this);

    // whether game is playing or not
    this.playing = false;

    
    document.addEventListener('keydown', (e) => {
      if(e.key == 'F6' || e.key == 'F4') {
        e.preventDefault();
        this.toggle();
      }
    })

    this.renderer = PIXI.autoDetectRenderer({
      autoStart: true,
      width: 1024,
      height: 768,
      view: canvas,
      transparent: true,
      antialias: true
    });
    
    this.stage = new Stage();
    this.mouse = new Mouse();
    this.contextMenu = new ContextMenu(this);
  }

  init() {
    var canvas = document.getElementById('canvas');
    
    this.stage.init(this.renderer.width, this.renderer.height);
    PIXI.ticker.shared.add(this.loop);
  }

  loop(delta) {
    this.emit('tick', {delta, deltaTime:delta/60});
    this.stage.updateTransform();
    this.renderer.render(this.stage.container);
  }

  start() {
    this.playing = true;
    this.mouse.gamePreStart();
    this.emit('game.prestart')
    this.emit('game.start')
  }

  stop() {
    this.playing = false;
    this.emit('game.stop')
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
}

let editor = new Editor();
editor.init();
window.Editor = editor;