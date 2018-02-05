import FilterSection from './FilterSection';
import SearchField from './SearchField';
import BrowserHeader from "./BrowserHeader";
import ContentSection from "./ContentSection";
import EventEmitter from '../utils/EventEmitter';
require('./Browser.scss')

export default class Browser extends EventEmitter
{
  static eventEmitter = new EventEmitter()

  constructor() {
    super();

    this.element = document.createElement('div');
    this.element.className = 'browser'

    this.header = new BrowserHeader();
    this.element.appendChild(this.header.element);

    this.contentSection = new ContentSection();
    this.element.appendChild(this.contentSection.element);

    this.searchField = this.header.searchField;
    this.onSearch = this.onSearch.bind(this);
    this.searchField.input.addEventListener('input', this.onSearch);

    this.keydown = this.keydown.bind(this);
    this.element.addEventListener('keydown', this.keydown);

    this.header.closeButton.addEventListener('mousedown', e => {
      this.close();
    })

    this.onScroll = this.onScroll.bind(this);
    this.contentSection.scroll.addEventListener('scroll', this.onScroll, false);

    this.boxes = [];

    this.resolve = null;
  }

  onSearch(e) {
    // override me....
  }

  keydown(e) {
    if(e.keyCode == 27) {
      // makes sure only browser is closed, not the  whole graph
      e.stopPropagation();

      this.close();
    }
    //enter
    else if(e.keyCode == 13) {
      this.quickSelect();
    }
  }

  quickSelect() {

  }

  open() {
    this.element.style.opacity = 0;
    this.tween = TweenLite.to(this.element.style, 0.15, {opacity: 1.0, ease:Quad.easeIn, onComplete: () => {
      this.element.style.opacity = 1.0;
    }});
    
    document.body.appendChild(this.element);
    this.searchField.focus();

    this.element.dispatchEvent(new CustomEvent('browser.opened', {detail:this, bubbles:true}));

    return new Promise(resolve => {
      this.resolve = resolve;
      this.process();
    })
  }

  process() {
    // override me
  }

  close(data) {
    this.element.removeEventListener('keydown', this.keydown);
    // TODO: not sure why I can't tween opacity directly. Have to manually set it.
    let opacity = {value: 1};
    TweenLite.to(opacity, 0.13, {value: 0, ease:Quad.easeIn, onUpdate: () => {
      this.element.style.opacity = opacity.value;
    }, onComplete: () => {
      // remove all listeners of the boxes
      for(let box of this.boxes) {
        box.destroy();
      }
      this.boxes = null;
      // clear all the listener
      this.removeAllListeners();
      document.body.removeChild(this.element);
    }})

    this.resolve(data);
  }

  add(gridBox, groupName) {
    this.contentSection.add(gridBox, groupName);
    this.boxes.push(gridBox);
  }

  onScroll(e) {

  }

  onError(message, error) {
    console.error(error)
    this.contentSection.placeholder = message;
  }

  clear() {
    this.contentSection.clear();
  }
}