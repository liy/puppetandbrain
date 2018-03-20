import Fuse from 'fuse.js'

import Browser from "./Browser";
import ArrayMap from "@/utils/ArrayMap";
import GroupSection from "./GroupSection";
import DataType from '../data/DataType';
import BlockBox from './BlockBox';

// FIXME: clean up needed!!
export default class BlockBrowser extends Browser
{
  constructor() {
    super();

    this.searchOptions = {
      // id: 'className',
      shouldSort: true,
      threshold: 0.2,
      keys: [{
        name: 'category', weight: 0.05
      }, {
        name: 'keywords', weight: 0.05
      }, {
        name: 'name', weight: 0.9  
      }] 
    }

    this.fuse = null;
  }

  onSearch(e) {
    if((e.target.value).trim() === '') {
      this.filteredTemplates = this.templates;
    }
    else {
      this.filteredTemplates = this.fuse.search(e.target.value);
    }
    this.refresh(this.filteredTemplates);
    this.contentSection.resetScroll();
  }

  quickSelect() {
    // only allow quick selection when filtered number of results are small enough
    if(this.filteredTemplates && this.filteredTemplates.length < 15) {
      let template = this.filteredTemplates[0];
      if(!template) return;

      template.x = template.x || window.innerWidth/2;
      template.y = template.y || window.innerHeight/2;

      this.close(template);
    } 
  }

  process() {
    this.filteredTemplates = this.templates = NodeTemplate.getTemplates(BrainGraph.brain.owner);
    this.fuse = new Fuse(this.templates, this.searchOptions);

    this.refresh(this.templates);
  }

  refresh(tempaltes) {
    this.clear();

    for(let template of tempaltes) {
      let box = new BlockBox(template);
      this.add(box, template.category);
      box.on('browser.close', this.close, this);
    }

    this.element.dispatchEvent(new CustomEvent('browser.content.ready', {detail:this, bubbles:true}));
  }
}