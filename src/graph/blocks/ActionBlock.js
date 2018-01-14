import './ActionBlock.scss'
import Block from "./Block";
import AddOutputPin from '../support/AddOutputPin'
import AOutputPin from "../support/AOutputPin";
import { nextFrame } from '../../utils/utils';

export default class ActionBlock extends Block
{
  constructor() {
    super();

    this.title.contentEditable = true;
    this.title.setAttribute('placeholder', 'Action Name');

    this.body.minWidth = 140;
    this.body.minHeight = 120;

    this.onTitleInput = this.onTitleInput.bind(this)
    this.onOutputAdded = this.onOutputAdded.bind(this)
  }

  init(node) {
    super.init(node);

    this.title.textContent = this.node.actionName;

    this.addOutputPin = new AddOutputPin(node);
    this.body.addRight(this.addOutputPin);
    
    this.title.addEventListener('input', this.onTitleInput);

    this.node.outputs.on('output.added', this.onOutputAdded);
  }

  focus() {
    // wait until next frame, when the element is added onto the screen to focus title
    nextFrame().then(() => {
      this.title.focus();
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

  onOutputAdded(name) {
    let pin = new AOutputPin(name);
    pin.init(this.node);
    this.body.addRight(pin);
    // make sure the add pin is the last
    this.body.addRight(this.addOutputPin);

    this.outputPins.set(name, pin);
  }
}