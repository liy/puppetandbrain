
import Component from './Component';
import ActorSelection from '../objects/ActorSelection';

// TODO: maybe use a outline filter instead???
export default class SelectionComponent extends Component
{
  constructor(dimension) {
    super();

    this.dimension = dimension;

    this.selected = false;

    this.selectOutline = new filters.OutlineFilter(4, 0x0084ff)
    this.hoverOutline = new filters.OutlineFilter(1, 0x000000)
  }

  destroy() {
    super.destroy();
    this.entity.off('mousedown', this.mousedown, this);
    this.entity.off('mouseover', this.mouseover, this);
    this.entity.off('mouseout', this.mouseout, this);
    this.entity.off('touchstart', this.touchstart, this);
  }

  added() {
    this.entity.interactive = true;
    this.entity.on('mousedown', this.mousedown, this);
    this.entity.on('mouseover', this.mouseover, this);
    this.entity.on('mouseout', this.mouseout, this);
    this.entity.on('touchstart', this.touchstart, this);

    this.tickEnabled = true;
  }
  
  select() {
    if(!this.entity.loaded) return;

    // TODO: handle muti-selection
    ActorSelection.set(this.entity);

    this.selected = true;
    this.entity.filters = [this.selectOutline];
  }

  deselect() {
    ActorSelection.remove(this.entity);
    this.entity.alpha = 1

    this.selected = false;
    this.entity.filters = [];
  }

  mousedown() {
    this.select();
  }

  mouseover() {
    if(!this.selected && this.entity.loaded) {
      this.entity.filters = [this.hoverOutline];
    }
  }

  mouseout() {
    if(!this.selected) {
      this.entity.filters = [];
    }
    else {
      this.entity.filters = [this.selectOutline];
    }
  }

  touchstart() {
    this.select();
  }

  tick() {
    
  }
}