import './PuppetBrowser.scss';
import ContentSection from './ContentSection';

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add(['browser', 'puppet-browser']);

    this.header = document.createElement('browser-header');
    this.header.className = 'browser-header';

    this.contentSection = new ContentSection();
  }

  open(x, y) {
    super.open();

  }
}