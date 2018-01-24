import './PuppetBrowser.scss';
import ContentSection from './ContentSection';
import BrowserHeader from './BrowserHeader';

import PuppetBox from './PuppetBox'

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('browser', 'puppet-browser');

    this.header = new BrowserHeader();
    this.element.appendChild(this.header.element);

    this.contentSection = new ContentSection();
    this.element.appendChild(this.contentSection.element);
  }

  open() {
    document.body.appendChild(this.element);

    for(let i=0; i<10; ++i) {
      this.contentSection.add(new PuppetBox(), 'test 1');
    }

    
    for(let i=0; i<5; ++i) {
      this.contentSection.add(new PuppetBox(), 'test 2');
    }
  }
}