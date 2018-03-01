import './Cursor.scss'
import rippleStr from '!raw-loader!@/assets/ripple.svg'
import pointerStr from '!raw-loader!./tutorial-pointer.svg'

export default class Cursor
{
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'tutorial-cursor'
    document.body.appendChild(this.element);

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
  }

  updateTransform() {
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg) scale(${this.scaleX}, ${this.scaleY})`
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
    this.x = rect.x+rect.width/2;
    this.y = rect.y+rect.height/2;
    this.updateTransform();
  }

  moveTo(target, dir='top') {
    if(typeof target == 'string') target = document.getElementById(target);

    // show and hide tooltip if any
    if(this.currentTarget) this.currentTarget.classList.remove('data-title-show');
    this.currentTarget = target;

    // move to the target
    let rect = target.getBoundingClientRect();
    this.moveToLocation(rect.x+rect.width/2, rect.y+rect.height/2, dir).then(() => {
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
    this.x = rect.x+rect.width/2;
    this.y = rect.y+rect.height/2;
    this.updateTransform();
  }

  fadeIn() {
    this.element.style.opacity = 1;
  }

  fadeOut() {
    this.element.style.opacity = 0;
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
      this.goto(target, dir)
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