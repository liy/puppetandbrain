import './BlockContextMenu.scss';

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'block-context-menu';

    this.menu = document.createElement('ul');

    this.opened = false;

    this.close = this.close.bind(this)

    Hub.on('block.contextmenu', this.open, this);
  }

  destroy() {
    Hub.off('block.contextmenu', this.open, this);
    document.removeEventListener('click', this.close);
  }

  open(template) {
    this.clearItems();

    document.addEventListener('click', this.close);

    this.opened = true;

    this.element.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
    // override me, hehe...
    this.element.appendChild(this.menu);
    document.body.appendChild(this.element);

    this.addItem('help...', () => {
      Hub.openBlockDoc(template)
    })
  }

  addItem(text, handler) {
    let entry = document.createElement('li');
    entry.textContent = text;
    this.menu.appendChild(entry);
    entry.addEventListener('click', e => {
      e.preventDefault();
      handler.call(this);
    })
  }

  clearItems() {
    while(this.menu.firstChild) {
      this.menu.removeChild(this.menu.firstChild);
    }
  }

  close(e) {
    document.removeEventListener('click', this.close);

    if(this.opened) {
      this.opened = false;
      if(this.element.contains(this.menu)) this.element.removeChild(this.menu);
      document.body.removeChild(this.element);

      this.clearItems();
    }
  }
}