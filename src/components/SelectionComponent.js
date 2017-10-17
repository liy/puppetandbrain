const filters = require('pixi-filters');

import Component from './Component';
import Selection from '../Selection';

// TODO: maybe use a outline filter instead???
export default class SelectionComponent extends Component
{
  constructor(dimension) {
    super();

    this.dimension = dimension;
    
    this.mousedown = this.mousedown.bind(this);
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.touchstart = this.touchstart.bind(this);

    this.selected = false;

    this.selectOutline = new filters.OutlineFilter(3, 0x66EE66)
    this.hoverOutline = new filters.OutlineFilter(2, 0xCCCCCC)
  }

  added() {
    this.owner.interactive = true;
    this.owner.on('mousedown', this.mousedown);
    this.owner.on('mouseover', this.mouseover);
    this.owner.on('mouseout', this.mouseout);
    this.owner.on('touchstart', this.touchstart);

    this.tickEnabled = true;
  }
  
  select() {
    if(!this.owner.loaded) return;

    // TODO: handle muti-selection
    Selection.set(this.owner);

    this.selected = true;
    this.owner.filters = [this.selectOutline];
  }

  deselect() {
    Selection.remove(this.owner);
    this.owner.alpha = 1

    this.selected = false;
    this.owner.filters = [];
  }

  mousedown() {
    this.select();
  }

  mouseover() {
    if(!this.selected && this.owner.loaded) {
      this.owner.filters = [this.hoverOutline];
    }
  }

  mouseout() {
    if(!this.selected) {
      this.owner.filters = [];
    }
    else {
      this.owner.filters = [this.selectOutline];
    }
  }

  touchstart() {
    this.select();
  }

  tick() {
    
  }
}