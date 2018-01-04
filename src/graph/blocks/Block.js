import './Block.scss'
import BlockBody from '../support/BlockBody';
import ArrayMap from '../../utils/ArrayMap';
import AOutputPin from '../support/AOutputPin';
import AInputPin from '../support/AInputPin';
import AExecutionInPin from '../support/AExecutionInPin';
import AExecutionOutPin from '../support/AExecutionOutPin';
import BlockSelection from '../BlockSelection';

import BlockIcon from '../gadgets/BlockIcon';
import {svgElement} from '../../utils/utils';

// TODO: remove this
import ClockIcon from '../../assets/icons/clock.svg';


export default class Block
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'a-block';

    this.title = document.createElement('div');
    this.title.className = 'a-title';
    this.element.appendChild(this.title);

    this.body = new BlockBody();
    this.element.appendChild(this.body.element);
    
    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);
    this.element.addEventListener('mousedown', this.dragstart);
    this.element.addEventListener('touchstart', this.dragstart);
    this.element.addEventListener('mouseup', this.dragstop);
    this.element.addEventListener('touchend', this.dragstop);

    this.element.appendChild(new BlockIcon(svgElement(ClockIcon)).element);
  }

  init(node) {
    this.node = node;
    this.id = this.node.id;
    this.inPin = null;
    this.outPins = new ArrayMap();
    this.inputPins = new ArrayMap();
    this.outputPins = new ArrayMap();

    this.title.textContent = node.nodeName;

    let pin = null;
    if(node.execution) {
      if(node.hasIn) {
        this.inPin = new AExecutionInPin();
        this.inPin.init(node);
        this.body.addLeft(this.inPin);
      }

      for(let name of node.execution.names) {
        pin = new AExecutionOutPin(name);
        pin.init(node);
        this.body.addRight(pin);
        this.outPins.set(name, pin)
      }
    }

    for(let name of node.inputs.names) {
      pin = new AInputPin(name);
      pin.init(node);
      this.body.addLeft(pin);
      this.inputPins.set(name, pin);
    }

    for(let name of node.outputs.names) {
      pin = new AOutputPin(name);
      pin.init(node);
      this.body.addRight(pin);
      this.outputPins.set(name, pin);
    }

    this.x = this.node.x;
    this.y = this.node.y;
    BrainGraph.addBlock(this);
  }

  destroy() {
    this.element.removeEventListener('mousedown', this.dragstart);
    this.element.removeEventListener('touchstart', this.dragstart);
    this.element.removeEventListener('mouseup', this.dragstop);
    this.element.removeEventListener('touchend', this.dragstop);
    BrainGraph.removeBlock(this);
  }

  dragstart(e) {
    let sx = e.clientX ? e.clientX : e.touches[0].clientX;
    let sy = e.clientY ? e.clientY : e.touches[0].clientY;
    this._dragOffset = {
      x: (this.element.getBoundingClientRect().left - sx),
      y: (this.element.getBoundingClientRect().top - sy)
    }
    document.addEventListener('mousemove', this.dragmove)
    document.addEventListener('touchmove', this.dragmove)

    BlockSelection.select(this);

    // bring to front 
    this.element.parentElement.appendChild(this.element);

    this.moveCommand = Commander.create('MoveBlock', this);
  }

  dragstop(e) {
    document.removeEventListener('mousemove', this.dragmove);
    document.removeEventListener('touchmove', this.dragmove);

    // process and push to history
    if(this.moveCommand) History.push(this.moveCommand.processAndSave());
  }

  dragmove(e) {
    let sx = e.clientX ? e.clientX : e.touches[0].clientX;
    let sy = e.clientY ? e.clientY : e.touches[0].clientY;
    // Make sure all of the values are in client coordincate system. Then apply a scale
    this.x = (sx - BrainGraph.blockContainer.getBoundingClientRect().left + this._dragOffset.x)/BrainGraph.scale;
    this.y = (sy - BrainGraph.blockContainer.getBoundingClientRect().top + this._dragOffset.y)/BrainGraph.scale;

    this.drawConnection();
  }

  drawConnection() {
    // executuion pins
    for(let pin of this.outPins.getValues()) {
      pin.drawConnection();
    }
    if(this.inPin) this.inPin.drawConnection();

    // output input pins
    for(let pin of this.inputPins.getValues()) {
      pin.drawConnection();
    }
    for(let pin of this.outputPins.getValues()){
      pin.drawConnection();
    }
  }

  set x(x) {
    this.element.style.left = x +'px'
    this.node.x = x;
  }

  set y(y) {
    this.element.style.top = y +'px'
    this.node.y = y;
  }

  template({name, hasIn, executionNames=[], inputNames=[], outputNames=[]}) {
    this.title.textContent = name || 'test';

    let pin = null;
    if(hasIn) {
      pin = new AExecutionInPin('');
      this.body.addLeft(pin);
    }

    for(let name of executionNames) {
      pin = new AExecutionOutPin(name);
      this.body.addRight(pin);
    }

    for(let name of inputNames) {
      pin = new AInputPin(name);
      this.body.addLeft(pin);
    }

    for(let name of outputNames) {
      pin = new AOutputPin(name);
      this.body.addRight(pin);
    }
  }
}