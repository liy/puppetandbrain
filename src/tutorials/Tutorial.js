import './Tutorial.scss';
import Cursor from './Cursor';
import TutorialBanner from './TutorialBanner'
import TutorialOverlay from './TutorialOverlay'
import { isMobile } from '@/utils/utils';

import store from '@/store'

export default class Tutorial 
{
  constructor() {}

  init() {
    this.steps = [];
    this.stepIndex = -1;

    // overlay
    this.overlay = new TutorialOverlay();
    // cusor pointer
    this.cursor = new Cursor();
    // banner text
    this.banner = new TutorialBanner(this.overlay, this.cursor);

    this.eventHandlers = [];
  }

  destroy() {
    // TODO: remove overlay, banner and cursor
    this.banner.destroy();
    this.overlay.destroy();
    this.cursor.destroy();
  }

  start() {
    this.next();
  }

  addStep(step) {
    this.steps.push(step);
  }

  once(type, callback, target=document) {
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

  when(type, callback, target=document) {
    let handler = callback.bind(this);
    if(typeof target.addEventListener === 'function') {
      this.eventHandlers.push({
        target,
        type,
        handler
      });
      target.addEventListener(type, handler)
    }
    else {
      this.eventHandlers.push({
        target,
        type,
        handler
      })
      target.on(type, handler);
    }
  }

  nextWhen(type, target=document) {
    this.once(type, this.next, target);
  }

  delayNext(miniseconds=5000) {
    setTimeout(() => {
      this.next()
    }, miniseconds);
  }

  waitUntil(type, target=document) {
    return new Promise(resolve => {
      this.once(type, resolve, target);
    })
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

      this.cursor.moveTo('guide-menu-icon');
      this.banner.info('You can navigate back to tutorials page using menu');

      setTimeout(() => {
        this.cursor.clear();
        this.banner.fadeOut();
      }, 5000)

      // not first visit anymore
      localStorage.setItem('visited', true);
      // TODO: ask user what to do next
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
    const nodes = document.evaluate(`//div[text() = '${blockName}']/..`, document.body)
    let node = null;
    while(node = nodes.iterateNext()) {
      if(node.classList.contains('template-block')) {
        return node;
      }
    }
    return null;
  }

  indicateBrowserPuppet(puppetName) {
    let element = this.browserPuppet(puppetName);
    element.classList.add('tutorial-indicator')
  }

  indicateBrowserBlock(blockName) {
    let element = this.browserBlock(blockName);
    element.parentNode.classList.add('tutorial-indicator')
  }

  indicateBlock(blockName) {
    const block = this.getBlock(blockName);
    this.cursor.indicate(block.element);
  }
  
  getCanvasActorButton() {
    const actorList = document.getElementById('actor-list')
    return actorList.querySelector('.canvas-actor')
  }
  
  getEnter(block) {
    return block.node.enter;
  }

  getInPinElement(block) {
    return block.inPin.symbol.element;
  }

  getOutPinElement(block, name='default') {
    return block.outPins.get(name).symbol.element;
  }

  getInputPinElement(block, inputName) {
    return block.inputPins.get(inputName).element;
  }

  getOutputPinElement(block, outputName) {
    return block.outputPins.get(outputName).element;
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

  findBlockStep(name) {
    return async () => {
      this.banner.info(`Find <b>${name}</b> block.`)
      this.cursor.moveTo('add-button', 'left');
      
      // hide cursor once browser open
      this.once('browser.opened', () => {
        this.cursor.fadeOut();
      })
      // but wait when content is ready to indicate block
      this.once('browser.content.ready', () => {
        this.indicateBrowserBlock(name);
      });

      this.once('graph.block.added', async e => {
        if(e.detail.block.titleText == name) {
          // pass the click block to next step
          this.next(e.detail.block);
        }
        // handles user select wrong block
        else {
          this.cursor.fadeOut();

          this.banner.push(`This is not <b>${name}</b> block.`)
              .push("Let's try it again.");
          await this.banner.start();

          this.redo()
        }
      });
    }
  }

  connectData(blockA, outputName, blockB, inputName) {
    blockA = (typeof blockA === 'string') ? this.getBlock(blockA) : blockA
    blockB = (typeof blockB === 'string') ? this.getBlock(blockB) : blockB

    const outputPin = blockA.outputPins.get(outputName);
    const inputPin = blockB.inputPins.get(inputName);
    const outputPinSymbol = outputPin.symbol;
    const inputPinSymbol = inputPin.symbol;

    if(isMobile) {
      this.banner.info(`Tap the <b>${outputName}</b> pin of <b>${blockA.titleText}</b>...`);
    }
    else {
      this.banner.info(`Drag the <b>${outputName}</b> pin of <b>${blockA.titleText}</b> and connect to the <b>${blockB.titleText}</b> input pin <b>${inputName}</b>`);
    }

    
    if(isMobile) {
      var targetElement = outputPinSymbol.element;
      var direction = 'right'
      this.cursor.moveTo(targetElement, direction);
      
      this.once('touchstart', () => {
        targetElement = inputPinSymbol.element;
        direction = 'bottom'

        this.banner.info(`And tap input <b>${inputName}</b> of <b>${blockB.titleText}</b> block to form the connection.`);
        this.cursor.moveTo(targetElement, direction);
      }, outputPinSymbol.element);

      // make sure the pointer is points to the correct element
      this.when('touchend', e => {
        // redo this step if user fail to connect
        if(!inputPin.input.isConnected && e.target != targetElement) {
          this.cursor.moveTo(targetElement, direction);
        }
      }, BrainGraph.container)
    }
    else {
      this.cursor.moveTo(outputPinSymbol.element, 'right');

      this.once('mousedown', () => {
        this.banner.info(`And connect to the input <b>${inputName}</b> of <b>${blockB.titleText}</b> block.`);
        this.cursor.moveTo(inputPinSymbol.element, 'bottom');
      }, outputPinSymbol.element);

      this.once('mouseup', () => {
        // redo this step if user fail to connect
        if(!inputPin.input.isConnected) {
          this.redo();
        }
      }, BrainGraph.container)
    }

    // handles user quick connect
    this.once('browser.opened', async e => {
      this.cursor.fadeOut();

      this.banner.push("Oops... you just performed a shortcut to add block.")
        .push('This is an advance feature in later tutorial.')
      await this.banner.start();

      this.banner.info('Click the close button and try again...')
      this.cursor.moveTo('close-browser-button', 'right');

      this.once('browser.closed', this.redo);
    })

    this.once('input.connected', data => {
      this.next();
    }, inputPin.input)
  }

  connectExecution(blockA, blockB, outNameA='default') {
    blockA = (typeof blockA === 'string') ? this.getBlock(blockA) : blockA
    blockB = (typeof blockB === 'string') ? this.getBlock(blockB) : blockB

    const outPin = blockA.outPins.get(outNameA);
    const inPin = blockB.inPin;
    const outPinSymbol = outPin.symbol;
    const inPinSymbol = inPin.symbol;

    if(isMobile) {
      this.banner.info(`Tap the <b>${outNameA}</b> pin of <b>${blockA.titleText}</b>...`);
    }
    else {
      this.banner.info(`Drag the <b>${outNameA}</b> pin of <b>${blockA.titleText}</b> and connect to the <b>${blockB.titleText}</b>`);
    }

    this.cursor.moveTo(outPinSymbol.element, 'right');
    
    if(isMobile) {
      var targetElement = outPinSymbol.element;
      var targetBlock = blockA
      var direction = 'right'
      
      this.once('touchstart', () => {
        targetElement = inPinSymbol.element;
        targetBlock = blockB
        direction = 'bottom'

        this.banner.info(`And tap left pin of <b>${blockB.titleText}</b> block to form the connection.`);
        this.cursor.moveTo(inPinSymbol.element, direction);
      }, outPinSymbol.element);

      // make sure the pointer is points to the correct element
      this.when('touchend', e => {
        // redo this step if user fail to connect
        if(!this.getEnter(targetBlock).isConnected && e.target != targetElement) {
          this.cursor.moveTo(targetElement, direction);
        }
      }, BrainGraph.container)
    }
    else {
      this.once('mousedown', () => {
        this.banner.info(`And connect to the left pin of <b>${blockB.titleText}</b> block.`);
        this.cursor.moveTo(inPinSymbol.element, 'bottom');
      }, outPinSymbol.element);

      this.once('mouseup', () => {
        // redo if fail to make the execution connection
        if(!this.getEnter(blockB).isConnected) {
          this.redo();
        }
      }, BrainGraph.container)
    }

    // handles user quick connect
    this.once('browser.opened', async e => {
      this.cursor.fadeOut();

      this.banner.push("Oops... you just performed a shortcut to add block.")
        .push('This is an advance feature in later tutorial.')
      await this.banner.start();

      this.banner.info('Click the close button and try again...')
      this.cursor.moveTo('close-browser-button', 'right');

      this.once('browser.closed', this.redo);
    })

    this.once('execution.connected', async (data) => {
      if(data.source.node == blockA.node && data.targetNode == blockB.node) {
        this.next();
      }
      else {
        this.banner.push("You have connected the wrong pins, try it again");
        await this.banner.start();
        // Undo last history
        Hub.history.undo();
        this.redo();
      }
    }, blockA.node)
  }

  backToStage() {
    // brain
    BrainGraph.close();
  }

  startGame() {
    // start game
    Hub.stage.start();
    // update ui
    store.commit('updateDebugMode', true);
  }

  stopGame() {
    Hub.stage.stop();
    store.commit('updateDebugMode', false);
  }
}