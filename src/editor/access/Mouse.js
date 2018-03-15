import EventEmitter from "@/utils/EventEmitter";
import Vec2 from '../math/Vec2'
import {isMobile} from "@/utils/utils";

export default class extends EventEmitter
{
  constructor(renderer, stage) {
    super();

    this.renderer = renderer;
    this.stage = stage;

    this.move = this.move.bind(this);
    this.updatePosition = this.updatePosition.bind(this)

    this.threshold = 300; 
    this.thresholdID = 0;

    this._position = new Vec2();

    if(isMobile)
    {
      const rect = this.stage.canvas.getBoundingClientRect();
      this.offset = {x: rect.left, y: rect.top}

      // Update mouse position for GetMousePosition block query purpose
      document.addEventListener('pointerdown', this.updatePosition);
      document.addEventListener('pointermove', this.updatePosition);

      Object.defineProperty(this, 'position', {
        get() {
          return this._position;
        }
      });
    }
    else {
      Object.defineProperty(this, 'position', {
        get() {
          var p = this.renderer.plugins.interaction.mouse.global;
          this._position.x = p.x;
          this._position.y = p.y;
          return this._position;
        }
      });
    }
  }

  destroy() {
    super.destroy();

    document.removeEventListener('pointerdown', this.updatePosition);
    document.removeEventListener('pointermove', this.updatePosition);

    clearTimeout(this.thresholdID);
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
  }

  gamePreStart() {
    document.addEventListener('mousemove', this.move);
    document.addEventListener('touchmove', this.move);
  }

  gameStop() {
    clearTimeout(this.thresholdID);

    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
  }

  updatePosition(e) {
    let x = e.clientX;
    let y = e.clientY;

    // override position
    this._position.x = x - this.offset.x;
    this._position.y = y - this.offset.y;
  }

  move(e) {
    clearTimeout(this.thresholdID);
    this.emit('mouse.move', e);
    this.thresholdID = setTimeout(() => {
      this.stop(e)
    }, this.threshold);
  }

  stop(e) {
    this.emit('mouse.stop', e)
  }
}