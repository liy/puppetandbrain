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

    this.keydown = this.keydown.bind(this);
    this.element.addEventListener('keydown', this.keydown);
  }

  keydown(e) {
    if(e.keyCode == 27) {
      this.close();
    }
  }

  open(x, y) {
    BrainGraph.blur = true;
    this.element.style.opacity = 0;
    this.tween = TweenLite.to(this.element.style, 0.15, {opacity: 1.0, ease:Quad.easeIn, onComplete: () => {
      this.element.style.opacity = 1.0;
    }});
    
    this.element.appendChild(this.contentSection.element);
    this.element.appendChild(this.header);
    this.header.appendChild(this.searchSection.element);
    this.header.appendChild(this.filterSection.element);
    document.body.appendChild(this.element);
    this.searchSection.focus();
  }

  close() {
    this.element.removeEventListener('keydown', this.keydown);
    // TODO: not sure why I can't tween opacity directly. Have to manually set it.
    let opacity = {value: 1};
    TweenLite.to(opacity, 0.13, {value: 0, ease:Quad.easeIn, onUpdate: () => {
      this.element.style.opacity = opacity.value;
    }, onComplete: () => {
      BrainGraph.blur = false;
      this.element.removeChild(this.contentSection.element);
      this.element.removeChild(this.header);
      this.header.removeChild(this.searchSection.element);
      this.header.removeChild(this.filterSection.element);
      document.body.removeChild(this.element);
    }})
  }
}