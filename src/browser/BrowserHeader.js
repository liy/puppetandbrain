import './BrowserHeader.scss';

import { svgElement } from "../utils/utils";
import CloseButton from '../assets/big-cross.svg';
import MenuButton from '../assets/menu-icon.svg';

import SearchField from './SearchField';

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'browser-header';

    this.closeButton = svgElement(CloseButton, {width:48, height:48, className: 'header-button'});
    this.element.appendChild(this.closeButton);

    this.searchField = new SearchField();
    this.searchField.className = 'search-field'
    this.element.appendChild(this.searchField.element);
    // TODO: to be removed when search is implemented
    this.searchField.element.style.visibility = 'hidden'

    this.menuButton = svgElement(MenuButton, {width:48, height:48, className: 'header-button'});
    this.menuButton.style.visibility = 'hidden';
    this.element.appendChild(this.menuButton);
  }
}