import './Tutorial.scss';
import Cursor from './Cursor';
import TutorialBanner from './TutorialBanner'
import TutorialOverlay from './TutorialOverlay'

export default class Tutorial 
{
  constructor() {
    this.steps = [];
    this.stepIndex = -1;

    // overlay
    this.overlay = new TutorialOverlay();
    // banner text
    this.banner = new TutorialBanner(this.overlay);
    // cusor pointer
    this.cursor = new Cursor();

    this.eventHandlers = [];
  }

  destroy() {
    // TODO: remove overlay, banner and cursor
  }

  start() {
    this.next();
  }

  addStep(step) {
    this.steps.push(step);
  }

  when(type, callback, target=document) {
    let handler = callback.bind(this);
    if(typeof target.addEventListener === 'function') {
      this.eventHandlers.push({
        target,
        type,
        handler
      });
      target.addEventListener(type, handler, {once:true})
    }
    else {
      this.eventHandlers.push({
        target,
        type,
        handler
      })
      target.once(type, handler);
    }
  }

  nextWhen(type, target=document) {
    this.when(type, this.next, target);
  }

  clearEventHandlers() {
    for(let {target, type, handler} of this.eventHandlers) {
      if(typeof target.removeEventListener === 'function') {
        target.removeEventListener(type, handler);
      }
      else {
        target.off(type, handler);
      }
    }
  }

  next(param) {
    // clear the event handlers of every step
    this.clearEventHandlers();
    this.cursor.clear();
    this.banner.fadeOut();
    
    this.currentStep = this.steps[++this.stepIndex];
    if(this.currentStep) {
      this.currentStep.call(this, param);
    }
    else {
      this.overlay.hide();
    }
  }

  redo() {
    // clear the event handlers of every step
    this.clearEventHandlers();
    this.cursor.clear();
    this.banner.fadeOut();

    this.currentStep = this.steps[this.stepIndex];
    if(this.currentStep) {
      this.currentStep.call();
    }
  }

  gotoLastStep() {
    // clear the event handlers of every step
    this.clearEventHandlers();
    this.cursor.clear();
    this.banner.fadeOut();

    this.currentStep = this.steps[--this.stepIndex];
    if(this.currentStep) {
      this.currentStep.call();
    }
  }

  browserPuppet(puppetName) {
    return document.evaluate(`//span[text() = '${puppetName}']/..`, document.body).iterateNext()
  }

  browserBlock(blockName) {
    return document.evaluate(`//div[text() = '${blockName}']/..`, document.body).iterateNext()
  }
  

  getInPin(block) {
    return block.inPin.symbol.element;
  }

  getOutPin(block, name='default') {
    return block.outPins.get(name).symbol.element;
  }

  getBlock(name) {
    for(let block of BrainGraph.blocks) {
      if(block.title.textContent == name) {
        return block;
      }
    }
    return null;
  }

  element(id) {
    return document.getElementById(id);
  }
}