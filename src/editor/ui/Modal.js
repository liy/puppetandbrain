import './Modal.scss';

export default class Modal
{
  openedModal=null

  static close() {
    if(Modal.openedModal) Modal.openedModal.close()
  }

  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'modal-wrapper';

    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.element.appendChild(this.modal);

    this.title = document.createElement('h2');
    this.modal.appendChild(this.title);

    this.content = document.createElement('div');
    this.content.className = 'modal-content'
    this.modal.appendChild(this.content);

    this.action = document.createElement('div');
    this.action.className = 'modal-action'
    this.modal.appendChild(this.action);

    this.primaryBtn = document.createElement('button');
    this.primaryBtn.className = 'primary'
    this.primaryBtn.textContent = 'Confirm'
    this.action.appendChild(this.primaryBtn)
    this.secondaryBtn = document.createElement('button');
    this.secondaryBtn.textContent = 'Cancel'
    this.action.appendChild(this.secondaryBtn)

    this.modal.addEventListener('click', e => {
      e.stopPropagation();
    })

    this.primaryBtn.addEventListener('click', this.onPrimaryClick.bind(this), {once: true})
    this.secondaryBtn.addEventListener('click', this.onSecondaryClick.bind(this), {once: true})
    this.element.addEventListener('click', this.onOverlayClick.bind(this), {once:true})
  }

  process() {
    return new Promise(resolve => {
      this.resolve = (action) => {
        this.close();
        resolve({action, data:this.data});
      };
    });
  }

  set primaryText(text) {
    this.primaryBtn.textContent = text;
  }

  set secondaryText(text) {
    this.secondaryBtn.textContent = text;
  }

  open() {
    this.element.style.display = 'flex'
    document.body.appendChild(this.element);
    this.focus();
    // For destroy the modal
    Modal.openedModal = this;
    return this.process();
  }

  close() {
    this.element.style.display = 'none';
    document.body.removeChild(this.element);
    console.log('close!')
    // For destroy the modal
    Modal.openedModal = null;
  }

  get data() {
    return null;
  }

  onPrimaryClick(e) {
    e.stopPropagation();
    
    this.resolve(true);
  }

  onSecondaryClick(e) {
    e.stopPropagation();

    this.resolve(false);
  }

  onOverlayClick(e) {
    this.resolve(false);
  }

  focus() {
    // TODO: called after append to screen
    this.primaryBtn.focus();
  }
}