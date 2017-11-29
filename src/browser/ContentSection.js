require('./ContentSection.scss')
import DummyBlock from "./DummyBlock";

export default class ContentSection
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'content-section';

    this.gridSection = document.createElement('div');
    this.gridSection.className = 'grid-section';
    // this.gridSection.style.overflowY = 'scroll';
    this.element.appendChild(this.gridSection);

    this.blocks = [];

    for(let i=0; i<10; ++i) {
      let block = new DummyBlock({
        nodeName: 'test'
      });
      this.addBlock(block);
    }
  }

  addBlock(block) {
    this.gridSection.appendChild(block.gridBox);
    this.blocks.push(block);
  }
}