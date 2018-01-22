import './PuppetBrowser.scss';
import Fuse from 'fuse.js'
import Browser from "./Browser";
import PuppetEntry from './PuppetEntry'
import GroupSection from './GroupSection';

export default class extends Browser
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

  open(x, y) {
    super.open();

    LookUp.getPuppets().then(collection => {
      collection.forEach(doc => {
        this.getGroup().append(new PuppetEntry(doc.data()));
      })
    })

    return new Promise((resolve, reject) => {
      this.resolve = resolve;

    })
  }

  refresh() {
    this.clear();
  }

  getGroup() {
    if(!this.defaultGroup) {
      this.defaultGroup = new GroupSection('puppets');
      this.contentSection.addGroup(this.defaultGroup);
    }
    return this.defaultGroup;
  }

  clear() {

  }
}