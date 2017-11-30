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

    this.contentSection = new ContentSection();
    this.searchSection = new SearchSection();
    this.filterSection = new FilterSection();
  }

  open(x, y) {
    this.element.appendChild(this.contentSection.element);
    this.element.appendChild(this.header);
    this.header.appendChild(this.searchSection.element);
    this.header.appendChild(this.filterSection.element);
    document.body.appendChild(this.element);
    this.searchSection.focus();
  }

  close() {
    this.element.removeChild(this.contentSection.element);
    this.element.removeChild(this.header);
    this.header.removeChild(this.searchSection.element);
    this.header.removeChild(this.filterSection.element);
    document.body.removeChild(this.element);
  }
}