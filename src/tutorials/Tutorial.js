import './Tutorial.scss';
import Cursor from './Cursor';

export default class Tutorial 
{
  constructor() {
    this.cursor = new Cursor();
    this.steps = [];
  }

  start() {
    this.next();
  }

  addStep(step) {
    this.steps.push(step);
  }

  next() {
    this.cursor.fadeOut();
    
    this.currentStep = this.steps.shift();
    if(this.currentStep) {
      this.currentStep.call();
    }
    else {
      console.log('tutorial complete!')
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