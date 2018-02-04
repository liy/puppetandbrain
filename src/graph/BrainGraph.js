import './blocks/color-theme.scss';
import './BrainGraph.scss';

import GraphSelection from './GraphSelection';
import ArrayMap from '../utils/ArrayMap';
import BlockBrowser from '../browser/BlockBrowser';
import ElementController from './elements/ElementController';

class BrainGraph
{
  constructor() {
    this.container = document.getElementById('graph');
    this.blockContainer = document.getElementById('block-container');
    this.svg = document.getElementById('svg');

    // this make everything else lose focus, which is necessary when you want to force make
    // input field or texti field lose focus.
    // When input is focused, only input undo and redo is allowed. Therefore, people will tend
    // to click to other place to make input lose focus and re-enable editor undoredo.
    this.container.setAttribute('tabIndex', 0);
    this.container.addEventListener('mousedown', e => {
      this.container.focus();
    })

    ElementController.init();
    this.container.appendChild(ElementController.panel.element);

    this.dbClicks = 0;

    this.lastTouchX = 0;
    this.lastTouchY = 0;

    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.zoomX = 0;
    this.zoomY = 0;

    this.tween = null;

    this.startPan = this.startPan.bind(this);
    this.onPan = this.onPan.bind(this);
    this.stopPan = this.stopPan.bind(this);
    this.container.addEventListener('mousedown', this.startPan);
    this.container.addEventListener('touchstart', this.startPan);
    document.addEventListener('mouseup', this.stopPan);
    document.addEventListener('touchend', this.stopPan);
    this.container.addEventListener('wheel', e => {
      let ox = e.clientX * this.scale ;
      let oy = e.clientY * this.scale  
      if(e.deltaY<0) {
        this.scale += 0.05;
        this.scale = Math.min(this.scale, 2)
      }
      else {
        this.scale -= 0.05;
        this.scale = Math.max(this.scale, 0.2);
      }

      // FIXME: implement zoom towards a point!!!
      // this.zoomX = e.clientX/this.scale - e.clientX
      // this.zoomY = e.clientY/this.scale - e.clientY


      this.updateTransform();
    });

  }

  startPan(e) {
    if(e.which == 0) {
      this.lastTouchX = e.touches[0].clientX 
      this.lastTouchY = e.touches[0].clientY 
    }

    if(e.target == this.container) {
      this.container.addEventListener('mousemove', this.onPan);
      this.container.addEventListener('touchmove', this.onPan, { passive: false });
    }
  }

  onPan(e) {
    // stop mobile drag to refresh action
    e.preventDefault();

    if(e.touches) {
      this.translateX += e.touches[0].clientX - this.lastTouchX
      this.translateY += e.touches[0].clientY - this.lastTouchY
      
      this.lastTouchX = e.touches[0].clientX 
      this.lastTouchY = e.touches[0].clientY 
    }
    else {
      this.translateX += e.movementX;
      this.translateY += e.movementY;
    }
    this.updateTransform();
  }

  stopPan(e) {
    this.container.removeEventListener('mousemove', this.onPan);
    this.container.removeEventListener('touchmove', this.onPan);
  }

  updateTransform() {
    this.blockContainer.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale}, ${this.scale})  translate(${this.zoomX}px, ${this.zoomY}px)`;
    // FIXME: might have performance issue!!!!
    this.refresh();
  }

  open(brain) {
    this.brain = brain;
    this.blocks = new ArrayMap();

    // extract all variables of the brain
    ElementController.open(brain);

    this.resize = this.resize.bind(this);
    this.keydown = this.keydown.bind(this)
    this.pointerdown = this.pointerdown.bind(this);
    this.onRightClick = this.onRightClick.bind(this)

    this.container.style.display = 'block'

    this.container.addEventListener('contextmenu', this.onRightClick);
    this.container.addEventListener('mousedown', this.pointerdown);
    document.addEventListener('keydown', this.keydown);
    window.addEventListener('resize', this.resize);
    this.resize();

    Editor.stage.blurEnabled = true;
    GraphSelection.enable();

    for(let node of this.brain.getNodes()) {
      BlockFactory.create(node);
    }

    this.draw();

    this.container.style.opacity = 0;
    this.tween = TweenLite.to(this.container.style, 0.15, {opacity: 1.0, ease:Quad.easeIn, onComplete: () => {
      this.container.style.opacity = 1.0;
    }});

    UIController.brainMode();
  }

  close() {
    this.container.removeEventListener('contextmenu', this.onRightClick);
    this.container.removeEventListener('mousedown', this.pointerdown);
    document.removeEventListener('keydown', this.keydown);
    window.removeEventListener('resize', this.resize);
    
    let opacity = {value: 1};
    this.tween = TweenLite.to(opacity, 0.13, {value: 0, ease:Quad.easeIn, onUpdate: () => {
      this.container.style.opacity = opacity.value;
    }, onComplete: () => {
      while(this.svg.lastChild) {
        this.svg.removeChild(this.svg.lastChild)
      }
      for(let block of this.blocks.getValues()) {
        block.destroy();
      }
  
      ElementController.close();
      
      this.container.style.display = 'none'
  
      Editor.stage.blurEnabled = false;
      GraphSelection.deselect();
      GraphSelection.disable();

      UIController.stageMode();
    }})
  }

  hide() {
    Editor.stage.blurEnabled = false;
    this.container.style.display = 'none'
  }

  show() {
    Editor.stage.blurEnabled = true;
    this.container.style.display = 'block'
  }

  switchTo(brain) {
    while(this.svg.hasChildNodes()) {
      this.svg.removeChild(this.svg.lastChild)
    }
    for(let block of this.blocks.getValues()) {
      block.destroy();
    }

    this.brain = brain;
    this.blocks = new ArrayMap();

    for(let node of this.brain.getNodes()) {
      BlockFactory.create(node);
    }

    this.draw();
  }

  pointerdown(e) {
    let target = e.target;
    if(e.which == 0) {
      let touch = e.changedTouches[0];
      target = document.elementFromPoint(touch.clientX, touch.clientY);
    }
    if(target == this.container) {
      e.preventDefault();
    }
  }

  keydown(e) {
    // escape
    if(e.keyCode == 27) {
      e.preventDefault();
      e.stopImmediatePropagation();
      History.push(Commander.create('CloseGraph', this.brain.id).process());
    }
  }

  draw() {
    for(let block of this.blocks.getValues()) {
      // draw connection
      // refresh in pin, only update the in pin icon status
      if(block.inPin) block.inPin.refreshSymbol();
      if(block.outPins) {
        block.outPins.getValues().forEach(pin => {
          pin.refreshSymbol();
        })
      }
      block.inputPins.getValues().forEach(pin => {
        pin.refreshSymbol();
      })
      block.outputPins.getValues().forEach(pin => {
        pin.refreshSymbol();
      })
    }
  }

  addBlock(block) {
    this.blocks.set(block.id, block);
    this.blockContainer.appendChild(block.element);
  }

  getBlock(id) {
    return this.blocks.get(id);
  }

  // remove it visually
  removeBlock(block) {
    this.blocks.remove(block.id);
    this.blockContainer.removeChild(block.element);
  }

  // destroy node and block all together and its connections, also remove it visually
  deleteBlock(block) {
    // disconnect all execution pins, if it has any
    if(block.inPin) {
      Commander.create('RemoveParentExecution', block.node.id).process();
    }
    if(block.outPins) {
      for(let pin of block.outPins.getValues()) {
        Commander.create('RemoveExecution', pin.node, pin.name).process();        
      }
    }
    // disconnect all pins
    for(let pin of block.inputPins.getValues()) {
      Commander.create('RemoveInputDataLink', pin.node.id, pin.name).process();
    }
    for(let pin of block.outputPins.getValues()) {
      Commander.create('RemoveOutputDataLink', pin.node.id, pin.name).process();
    }
    
    // destroy block and remove it from the graph
    block.destroy();
    // destroy the node and remove from the brain
    block.node.destroy();
  }

  async onRightClick(e) {
    if(e.target == this.container) {
      e.stopPropagation();
      e.preventDefault();
      
      var browser = new BlockBrowser();
      let blockPod = await browser.open();
      if(blockPod) {
        blockPod.x = blockPod.x || (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
        blockPod.y = blockPod.y || (e.changedTouches ? e.changedTouches[0].clientY : e.clientY);
        History.push(Commander.create('CreateBlock', blockPod, this.brain.owner.id).processAndSave());
      }
    }
  }

  set blur(v) {
    if(v) {
      this.container.classList.add('blur')
    }
    else {
      this.container.classList.remove('blur')
    }
  }

  refresh() {
    while(this.svg.lastChild) {
      this.svg.removeChild(this.svg.lastChild)
    }
    this.draw();
  }

  resize() {
    this.svg.setAttribute('width', window.innerWidth)
    this.svg.setAttribute('height', window.innerHeight)
  }
}

window.BrainGraph = new BrainGraph();