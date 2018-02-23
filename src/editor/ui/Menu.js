import './Menu.scss';
import { svgElement } from '@/utils/utils';
import MenuIcon from '@/assets/menu-icon.svg';

export default class 
{
  constructor() {
    this.element = document.getElementById('menu');
    this.icon = document.createElement('div');
    this.icon.id = 'menu-icon';
    this.element.appendChild(this.icon);
    this.icon.appendChild(svgElement(MenuIcon, {width:48, height:48}));

    this.content = document.getElementById('menu-content');

    this.opened = false;

    this.toggle = this.toggle.bind(this);
    this.icon.addEventListener('click', this.toggle);

    this.close = this.close.bind(this)
    document.addEventListener('click', this.close);
  }

  toggle(e) {
    this.opened = !this.opened;
    this.content.style.visibility = this.opened ? 'visible': 'hidden';
  }

  close(e) {
    if(e.target != this.icon) {
      this.opened = false;
      this.content.style.visibility = 'hidden';
    }
  }
}