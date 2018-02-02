import './ActionBlock.scss'
import Block from "./Block";
import AddOutputPin from '../support/AddOutputPin'
import OutputPin from "../support/OutputPin";
import { nextFrame } from '../../utils/utils';
import DataType from '../../data/DataType'

export default class ActionBlock extends Block
{
  constructor() {
    super();

    this.title.contentEditable = true;
    this.title.setAttribute('placeholder', 'Action Name');

    this.body.minWidth = 140;
    this.body.minHeight = 120;

    this.onTitleInput = this.onTitleInput.bind(this)
  }

  destroy() {
    this.addOutputPin.off('addPin.trigger', this.addPinTrigger, this)
    this.node.outputs.off('output.added', this.onOutputAdded, this)
    
    super.destroy();
  }

  init(node) {
    super.init(node);

    this.title.textContent = this.node.actionName;

    this.addOutputPin = new AddOutputPin();
    this.body.addRight(this.addOutputPin);
    this.addOutputPin.on('addPin.trigger', this.addPinTrigger, this)
    this.node.outputs.on('output.added', this.onOutputAdded, this)
    
    this.title.addEventListener('input', this.onTitleInput);
  }

  focus() {
    // wait until next frame, when the element is added onto the screen to focus title
    nextFrame().then(() => {
      if(this.title.textContent.trim() == '') {
        this.title.focus();
      }
      else {
        this.addOutputPin.focus();
      }
    }) 
  }

  onTitleInput(e) {
    if(!this.node.updateActionName(e.target.textContent)) {
      // TODO: display error 
      console.log('Cannot update action name to ', e.target.textContent)
    }
    else {
      // TODO: hide error
    }
  }

  addPinTrigger(name) {
    // TODO: ask user what type of data is?
    this.node.outputs.add(name, {
      type: DataType.GENERIC
    });
  }

  onOutputAdded(name) {
    let pin = new OutputPin(name);
    pin.init(this.node);
    this.body.addRight(pin);
    // make sure the add pin is the last
    this.body.addRight(this.addOutputPin);

    this.outputPins.set(name, pin);
  }
}