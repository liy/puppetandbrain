import './Tutorial.scss';
import Cursor from './Cursor';
import TutorialBanner from './TutorialBanner'

export default class Tutorial 
{
  constructor() {
    this.cursor = new Cursor();
    this.steps = [];

    this.banner = new TutorialBanner();
  }

  start() {
    this.next();
  }

  addStep(step) {
    this.steps.push(step);
  }

  next() {
    this.cursor.fadeOut();
    this.banner.fadeOut();
    
    this.currentStep = this.steps.shift();
    if(this.currentStep) {
      this.currentStep.call();
    }
    else {
      this.banner.push('🤖Me, author speaking again...')
        .push('You have completed this tutorial!')
        .push('Now, go out play hide and seek. I have lots of clean up jobs to do');
      this.banner.start();
    }
  }

  getPuppetFromBrowser(puppetName) {
    return document.evaluate(`//span[text() = '${puppetName}']/..`, document.body).iterateNext()
  }

  getBlockFromBrowser(blockName) {
    return document.evaluate(`//div[text() = '${blockName}']/..`, document.body).iterateNext()
  }
  

  getInPinSvg(block) {
    return block.inPin.symbol.svg;
  }

  getOutPinSvg(block, name='default') {
    return block.outPins.get(name).symbol.svg;
  }

  getBlock(name) {
    for(let block of BrainGraph.blocks) {
      if(block.title.textContent == name) {
        return block;
      }
    }
    return null;
  }
}