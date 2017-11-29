require('./GroupGrid.scss')
import DummyBlock from './DummyBlock';

export default class GroupGrid
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'group-grid';

    let len = Math.floor(Math.random()*20);
    for(let i=0; i<len; ++i) {
      let block = new DummyBlock({nodeName: 'test'})
      this.element.appendChild(block.gridBox);
    }
  }
}