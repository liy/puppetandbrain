import TaskBlock from "./TaskBlock";

export default class ActionBlock extends TaskBlock
{
  constructor(node) {
    super(node);
    this.content.classList.add('action-block');

    this.title.textContent = '';
    this.inputField = document.createElement('input');
    this.inputField.setAttribute('placeholder', 'Action Name');
    this.title.appendChild(this.inputField);
    if(node.actionName) {
      this.inputField.value = node.actionName;
      this.inputField.style.background = 'none'
    }
    else {
      this.inputField.focus();
    }
    this.hint = document.createElement('label');
    this.hint.className = 'input-error-hint'
    this.hint.textContent = 'Action name must be unique and not empty!'
    this.title.appendChild(this.hint);

    this.inputField.addEventListener('change', e => {
      if(!this.node.updateActionName(e.target.value)) {
        e.preventDefault();
        // TODO: diplay error hint
        this.hint.style.visibility = 'visible';
        return;
      }
      this.inputField.style.background = 'none'
    })
    this.inputField.addEventListener('keyup', e=> {
      if(!this.node.isValidActionName(e.target.value)) {
        this.hint.style.visibility = 'visible'
      }
      else {
        this.hint.style.visibility = 'hidden'
      }
    })

    this.container.addEventListener('mouseover', e => {
      this.inputField.style.backgroundColor = '#797979'
    })
    this.container.addEventListener('mouseout', e => {
      if(this.node.isValidActionName(this.inputField.value)) 
        this.inputField.style.background = 'none';
      else {
        this.inputField.style.backgroundColor = '#797979'
      }
    })
  }
}