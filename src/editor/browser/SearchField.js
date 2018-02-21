import './SearchField.scss';
import { svgElement } from '@/utils/utils';
import SearchIcon from '@/assets/search-icon.svg';

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'search-field';
    
    this.element.appendChild(svgElement(SearchIcon,{width:20, height:20}));

    this.input = document.createElement('input');
    this.input.placeholder = 'Search...'
    this.element.appendChild(this.input);
  }

  focus() {
    this.input.focus();
  }
}