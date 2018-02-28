import './ActionBlock.scss'
import Block from "./Block";
import AddOutputPin from '../support/AddOutputPin'
import OutputPin from "../support/OutputPin";
import { nextFrame } from '@/utils/utils';
import DataType from '../../data/DataType'

export default class ActionBlock extends Block
{
  constructor() {
    super();

    this.title.contentEditable = true;
    this.title.setAttribute('placeholder', 'Action Name');

    this.onTitleInput = this.onTitleInput.bind(this)
  }

  destroy() {
    this.addPinBtn.off('addPin.trigger', this.addPinTrigger, this)
    this.node.outputs.off('output.added', this.onOutputAdded, this)
    
    super.destroy();
  }

  init(node) {
    super.init(node);

    this.title.textContent = this.node.actionName;

    this.addPinBtn = new AddOutputPin();
    this.body.addRight(this.addPinBtn);
    this.addPinBtn.on('addPin.trigger', this.addPinTrigger, this)
    this.node.outputs.on('output.added', this.onOutputAdded, this)
    this.node.outputs.on('output.removed', this.onOutputRemoved, this)
    
    this.title.addEventListener('input', this.onTitleInput);
  }

  focus() {
    // wait until next frame, when the element is added onto the screen to focus title
    nextFrame().then(() => {
      if(this.title.textContent.trim() == '') {
        this.title.focus();
      }
      else {
        this.addPinBtn.focus();
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
    Hub.history.push(Commander.create('AddOutput', this.node.id, name, {
      type: DataType.GENERIC
    }).process())
  }

  onOutputAdded(name) {
    let pin = new OutputPin(name);
    pin.init(this.node);
    this.addOutputPin(pin);

    // make sure the add pin button is the last
    this.body.addRight(this.addPinBtn);
  }

  onOutputRemoved(output) {
    let pin = this.outputPins.get(output.name);
    if(pin) this.removeOutPin(pin);
  }
}