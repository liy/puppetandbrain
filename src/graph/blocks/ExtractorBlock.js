// import './ExtractorBlock.scss'
import Block from "./Block";
import AddOutputPin from '../support/AddOutputPin'
import OutputPin from "../support/OutputPin";
import { nextFrame } from '../../utils/utils';

export default class ExtractorBlock extends Block
{
  constructor() {
    super();

    this.onOutputAdded = this.onOutputAdded.bind(this)
    this.addPinTrigger = this.addPinTrigger.bind(this)
  }
  
  destroy() {
    this.addOutputPin.off('addPin.trigger', this.addPinTrigger, this)
    this.node.outputs.off('output.added', this.onOutputAdded, this)
    
    super.destroy();
  }

  init(node) {
    super.init(node);

    this.addOutputPin = new AddOutputPin(node);
    this.body.addRight(this.addOutputPin);
    this.addOutputPin.on('addPin.trigger', this.addPinTrigger)

    this.node.outputs.on('output.added', this.onOutputAdded);
  }

  focus() {
    this.addOutputPin.focus();
  }

  addPinTrigger(name) {
    // let node to deal with the detail output assignment
    this.node.outputs.addOutput(name);
  }

  onOutputAdded(name) {
    let pin = new OutputPin(name);
    pin.init(this.node);
    this.body.addRight(pin);
    // make sure the add pin is the last
    this.body.addRight(this.addOutputPin);

    this.outputPins.set(name, pin);

    // draw connections as the pins might moved
    this.drawConnection();
  }
}