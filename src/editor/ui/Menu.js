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

    // links
    // let links = [{
    //   name: 'Home',
    //   path: '/'
    // }, {
    //   name: 'Tutorials',
    //   path: '/tutorials/animate-a-puppet'
    // }, {
    //   name: 'About',
    //   path: '/about'
    // }]

    // let list = document.createElement('ul');
    // for(let link of links) {
    //   let entry = document.createElement('li');
    //   entry.textContent = link.name;
    //   list.appendChild(entry);
    //   entry.addEventListener('click', e => {
    //     e.preventDefault();
    //     this.toggle();
    //     router.navigate(link.path);
    //   })
    // }
    // this.content.appendChild(list);
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