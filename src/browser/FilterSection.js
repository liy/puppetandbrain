require('./FilterSection.scss');

import FilterButton from "./FilterButton";

export default class FilterSection
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'filter-section';

    for(let i=0; i<4; ++i) {
      let btn = new FilterButton();
      this.element.appendChild(btn.element);
    }
  }
}