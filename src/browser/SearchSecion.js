require('./SearchSection.scss');

export default class SearchSection
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'search-section';

    this.searchInput = document.createElement('input');
    this.searchInput.className = 'search-input';
    this.element.appendChild(this.searchInput);
  }

  focus() {
    this.searchInput.focus();
  }
}