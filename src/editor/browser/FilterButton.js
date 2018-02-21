require('./FilterButton.scss');

export default class FilterButton
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'filter-button';
  }
}