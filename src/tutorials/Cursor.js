import './Cursor.scss'
import rippleStr from '!raw-loader!@/assets/ripple.svg'
import pointerStr from '!raw-loader!./tutorial-pointer.svg'

export default class Cursor
{
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'tutorial-cursor'
    document.body.appendChild(this.element);

    this.onOpacityTransitionEnd = this.onOpacityTransitionEnd.bind(this)
    this.element.addEventListener('transitionend', this.onOpacityTransitionEnd)
    this.element.addEventListener('webkitTransitionEnd', this.onOpacityTransitionEnd)
    this.element.addEventListener('msTransitionEnd', this.onOpacityTransitionEnd)

    this.rippleSvg = new DOMParser().parseFromString(rippleStr, "image/svg+xml").rootElement;
    this.element.appendChild(this.rippleSvg)
    this.pointerSvg = new DOMParser().parseFromString(pointerStr, "image/svg+xml").rootElement;
    this.element.appendChild(this.pointerSvg);

    this.currentTarget = null;

    this.x = 0;
    this.y = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.rotation = 0;

    this.direction('top');
  }

  destroy() {
    this.cancelFollow();
    document.body.removeChild(this.element);
    
    this.element.removeEventListener('transitionend', this.onOpacityTransitionEnd)
    this.element.removeEventListener('webkitTransitionEnd', this.onOpacityTransitionEnd)
    this.element.removeEventListener('msTransitionEnd', this.onOpacityTransitionEnd)
  }

  onOpacityTransitionEnd(e) {
    // animate svg has really bad performance on mobile while element is scrolling...
    // It is better to completely stop it rendering(display:none)
    if(this.element.style.opacity == 0) {
      this.hide()
    }
  }

  updateTransform() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg) scale(${this.scaleX}, ${this.scaleY})`
  }

  moveToBlock(block, dir) {
    let rect = block.element.getBoundingClientRect();
    this.moveToLocation(block.x + rect.width/2, block.y+rect.height/2, dir);
  }

  moveToActor(actor, dir) {
    this.moveToLocation(actor.screenX, actor.screenY, dir);
  }

  moveToLocation(x, y, dir='top') {

    return new Promise(resolve => {
      this.direction(dir);

      // always reset to show pointer
      this.pointerSvg.style.display = 'block';
      this.rippleSvg.style.display = 'none';

      this.fadeIn();

      TweenLite.to(this, 0.5, {
        x, y, 
        rotation: this.rotation,
        ease:Quad.easeIn, 
        onUpdate: () => {
          this.updateTransform();
        }, 
        onComplete: () => {
          this.rippleSvg.style.display = 'block';
          resolve();
        } 
      });
    })
  }

  gotoLocation(x, y, dir='top', ripple=false) {
    this.direction(dir);

    // always reset to show pointer
    this.pointerSvg.style.display = 'block';
    this.rippleSvg.style.display = ripple ? 'block' : 'none';
    
    this.x = x;
    this.y = y;
    this.updateTransform();

    this.fadeIn();
  }

  indicate(target) {
    this.fadeIn();
    
    if(typeof target == 'string') target = document.getElementById(target);

    // hide old tooltip
    if(this.currentTarget) this.currentTarget.classList.remove('data-title-show');
    // show and hide tooltip if any
    this.currentTarget = target;
    this.currentTarget.classList.add('data-title-show')
    // call its focus function if any
    if(typeof this.currentTarget.focus == 'function') this.currentTarget.focus();

    // no pointer
    this.pointerSvg.style.display = 'none';

    let rect = target.getBoundingClientRect();
    this.x = rect.left+rect.width/2;
    this.y = rect.top+rect.height/2;
    this.updateTransform();
  }

  moveTo(target, dir='top') {
    if(typeof target === 'string') target = document.getElementById(target);
    
    // show and hide tooltip if any
    if(this.currentTarget) this.currentTarget.classList.remove('data-title-show');
    this.currentTarget = target;

    // move to the target
    let rect = target.getBoundingClientRect();
    this.moveToLocation(rect.left+rect.width/2, rect.top+rect.height/2, dir).then(() => {
      this.currentTarget.classList.add('data-title-show')
      if(typeof this.currentTarget.focus == 'function') this.currentTarget.focus();
    })
  }

  goto(target, dir='top') {
    if(typeof target == 'string') target = document.getElementById(target);

    // show and hide tooltip if any
    if(this.currentTarget) this.currentTarget.classList.remove('data-title-show');
    this.currentTarget = target;
    this.currentTarget.classList.add('data-title-show')
    if(typeof this.currentTarget.focus == 'function') this.currentTarget.focus();
    
    // always reset to show pointer
    this.pointerSvg.style.display = 'block';
    this.rippleSvg.style.display = 'block';

    this.fadeIn();

    this.direction(dir);
    let rect = target.getBoundingClientRect();
    this.x = rect.left+rect.width/2;
    this.y = rect.top+rect.height/2;
    this.updateTransform();
  }

  fadeIn() {
    // make sure it is shown
    this.show();
    this.element.style.opacity = 1;
  }

  fadeOut() {
    this.element.style.opacity = 0;
  }

  show() {
    // just make make sure it does not trigger redraw.
    // may be browser is clever enough to know the display is already in block state
    // no longer need to redraw?
    if(this.element.style.display == 'none') {
      this.element.style.display = 'block';
    }
  }

  hide() {
    this.element.style.display = 'none';
  }

  direction(dir) {
    switch(dir) {
      case 'right':
        this.rotation = 90;
        this.scaleX = -1;
        this.scaleY = 1;
        break;
      case 'left':
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = -90;
        break;
      case 'top':
        this.rotation = 0;
        this.scaleX = this.scaleY = 1;
        break;
      case 'bottom':
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = -1;
        break;
      default:
        this.scaleX = this.scaleY = 1;
        break;
    }
  }

  follow(target, dir='top') {
    const followLoop = () => {
      if(typeof target === 'function') {
        this.goto(target(), dir)
      }
      else {
        this.goto(target, dir)
      }
      
      this.followID = requestAnimationFrame(followLoop);
    }
    this.followID = requestAnimationFrame(followLoop)
  }

  cancelFollow() {
    cancelAnimationFrame(this.followID);
  }

  clear() {
    this.fadeOut();
    this.cancelFollow();
    if(this.currentTarget) this.currentTarget.classList.remove('data-title-show');
  }
}