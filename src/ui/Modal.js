import './Modal.scss';

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'modal';

    this.container = document.createElement('div');
    this.container.className = 'modal-container';
    this.element.appendChild(this.container);

    this.title = document.createElement('h2');
    this.container.appendChild(this.title);

    this.content = document.createElement('div');
    this.content.className = 'modal-content'
    this.container.appendChild(this.content);

    this.action = document.createElement('div');
    this.action.className = 'modal-action'
    this.container.appendChild(this.action);

    this.primaryBtn = document.createElement('button');
    this.primaryBtn.className = 'primary'
    this.primaryBtn.textContent = 'Confirm'
    this.action.appendChild(this.primaryBtn)
    this.secondaryBtn = document.createElement('button');
    this.secondaryBtn.textContent = 'Cancel'
    this.action.appendChild(this.secondaryBtn)

    this.primaryBtn.addEventListener('click', this.onPrimaryClick.bind(this), {once: true})
    this.secondaryBtn.addEventListener('click', this.onSecondaryClick.bind(this), {once: true})
    this.element.addEventListener('click', this.onOverlayClick.bind(this), {once:true})
  }

  open() {
    this.element.style.display = 'flex'

    document.body.appendChild(this.element);

    return new Promise(resolve => {
      this.resolve = (action) => {
        this.close();
        resolve(action);
      };
    });
  }

  close() {
    this.element.style.display = 'none';

    document.body.removeChild(this.element);
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
}