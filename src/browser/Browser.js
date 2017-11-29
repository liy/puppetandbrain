import FilterSection from './FilterSection';
import SearchSection from './SearchSecion';
import ContentSection from "./ContentSection";
require('./Browser.scss')

export default class Browser
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'browser'
    this.header = document.createElement('div');
    this.header.className = 'browser-header'
    this.element.appendChild(this.header);
  }

  init() {
    this.searchSection = new SearchSection();
    this.header.appendChild(this.searchSection.element);
    this.searchSection.focus();

    this.filterSection = new FilterSection();
    this.header.appendChild(this.filterSection.element);

    this.contentSection = new ContentSection();
    this.element.appendChild(this.contentSection.element);
  }
}