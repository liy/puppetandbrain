// import './ExtractorBlock.scss'
import Block from "./Block";
import AddOutputPin from '../support/AddOutputPin'
import AOutputPin from "../support/AOutputPin";
import { nextFrame } from '../../utils/utils';

export default class ExtractorBlock extends Block
{
  constructor() {
    super();

    this.onOutputAdded = this.onOutputAdded.bind(this)
    this.addPinTrigger = this.addPinTrigger.bind(this)
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
    let pointer = this.node.inputs.get('in');
    // override the added output
    this.node.outputs.assignProperty(name, {
      get: () => {
        return pointer.value[name]
      }
    });
  }

  onOutputAdded(name) {
    let pin = new AOutputPin(name);
    pin.init(this.node);
    this.body.addRight(pin);
    // make sure the add pin is the last
    this.body.addRight(this.addOutputPin);

    this.outputPins.set(name, pin);
  }
}