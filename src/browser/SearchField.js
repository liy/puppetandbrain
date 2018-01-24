import './SearchField.scss';
import { svgElement } from '../utils/utils';
import SearchIcon from '../assets/search-icon.svg';

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'search-field';
    
    this.element.appendChild(svgElement(SearchIcon,{width:20, height:20}));

    this.searchInput = document.createElement('input');
    this.searchInput.placeholder = 'Search...'
    this.element.appendChild(this.searchInput);
  }

  focus() {
    this.searchInput.focus();
  }
}