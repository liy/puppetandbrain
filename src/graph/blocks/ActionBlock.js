import './ActionBlock.scss'
import Block from "./Block";
import AddOutputPin from '../support/AddOutputPin'
import AInputPin from "../support/AInputPin";

export default class ActionBlock extends Block
{
  constructor() {
    super();

    this.title.style.maxWidth = '120px';
    this.title.contentEditable = true;
    this.title.setAttribute('placeholder', 'Action Name');

    this.body.minWidth = 120;
    this.body.minHeight = 120;

    this.onTitleInput = this.onTitleInput.bind(this)
  }

  init(node) {
    super.init(node);

    this.title.textContent = this.node.actionName;
    this.title.focus();

    this.body.addRight(new AddOutputPin(node));
    
    this.title.addEventListener('input', this.onTitleInput);
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
}