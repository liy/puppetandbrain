import FilterSection from './FilterSection';
import SearchField from './SearchField';
import BrowserHeader from "./BrowserHeader";
import ContentSection from "./ContentSection";
require('./Browser.scss')

export default class Browser
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'browser'

    this.header = new BrowserHeader();
    this.element.appendChild(this.header.element);

    this.contentSection = new ContentSection();
    this.searchField = new SearchField();
    this.filterSection = new FilterSection();

    this.searchField = this.searchField.searchInput;
    this.onSearch = this.onSearch.bind(this);
    this.searchField.addEventListener('input', this.onSearch);

    this.keydown = this.keydown.bind(this);
    this.element.addEventListener('keydown', this.keydown);
  }

  onSearch(e) {
    // override me....
  }

  keydown(e) {
    if(e.keyCode == 27) {
      this.close();
    }
    //enter
    else if(e.keyCode == 13) {
      this.quickSelect();
    }
  }

  quickSelect() {

  }

  open(x, y) {
    BrainGraph.blur = true;
    History.blur = true;
    this.element.style.opacity = 0;
    this.tween = TweenLite.to(this.element.style, 0.15, {opacity: 1.0, ease:Quad.easeIn, onComplete: () => {
      this.element.style.opacity = 1.0;
    }});
    
    this.element.appendChild(this.contentSection.element);
    this.element.appendChild(this.header);
    this.header.appendChild(this.searchField.element);
    this.header.appendChild(this.filterSection.element);
    document.body.appendChild(this.element);
    this.searchField.focus();
  }

  close() {
    this.element.removeEventListener('keydown', this.keydown);
    // TODO: not sure why I can't tween opacity directly. Have to manually set it.
    let opacity = {value: 1};
    TweenLite.to(opacity, 0.13, {value: 0, ease:Quad.easeIn, onUpdate: () => {
      this.element.style.opacity = opacity.value;
    }, onComplete: () => {
      History.blur = false;
      BrainGraph.blur = false;
      this.element.removeChild(this.contentSection.element);
      this.element.removeChild(this.header);
      this.header.removeChild(this.searchField.element);
      this.header.removeChild(this.filterSection.element);
      document.body.removeChild(this.element);
    }})
  }
}