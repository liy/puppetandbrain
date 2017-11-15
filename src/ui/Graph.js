import ConnectionHelper from './ConnectionHelper'
import ArithmeticBlock from './ArithmeticBlock';
import TaskBlock from './TaskBlock';
import PropertyBlock from './PropertyBlock';
import Animation from '../tasks/Animation';
import AnimationBlock from './blocks/AnimationBlock';

export default class Graph
{
  constructor() {
    this.container = document.getElementById('block-container');
    this.svg = document.getElementById('svg');

    this.blocks = [];
    this.map = Object.create(null);

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  // TODO: to be removed, the block creation should be handled by loader
  // block will have their position saved as well.
  init() {
    let tasks = LookUp.getTasks();
    let w = 225;
    let indent = 50;
    let tx = indent;
    let ty = 400;
    let h = 120;
    for(let i=0; i<tasks.length; ++i) {
      let block;
      if(tasks[i] instanceof Animation) {
        block = new AnimationBlock(tasks[i])
      }
      else {
        block = new TaskBlock(tasks[i])
      }
      this.add(block);
      block.x = tx;
      block.y = ty + this.container.offsetTop + Math.random()*60-30;
      tx += w;
      if(tx+w >= window.innerWidth) {
        tx = indent;
        ty += h;
      } 
    }
  
    let arr = LookUp.getArithmetics();
    for(let i=0; i<arr.length; ++i) {
      let block = new ArithmeticBlock(arr[i])
      this.add(block);
      block.x = tx;
      block.y = ty + this.container.offsetTop + Math.random()*60-30;
      tx += w;
      if(tx+w >= window.innerWidth) {
        tx = indent;
        ty += h;
      }
    }

    let getters = LookUp.getGetters();
    for(let i=0; i<getters.length; ++i) {
      let getter = getters[i];
      if(getter.__proto__.constructor.name === 'PropertyGetter') {
        let block = new PropertyBlock(getter)
        this.add(block);
        block.x = tx;
        block.y = ty + this.container.offsetTop + Math.random()*60-30;
        tx += w;
        if(tx+w >= window.innerWidth) {
          tx = indent;
          ty += h;
        }
      }
    }

    this.refresh();
  }

  add(block) {
    this.container.appendChild(block.container)

    this.blocks.push(block);
    this.map[block.model.id] = block;

    let json = window.localStorage[block.model.id];
    if(json) {
      let pos = JSON.parse(json);
      block.x = pos.x;
      block.y = pos.y;
    }
  }

  getBlock(taskID) {
    return this.map[taskID]
  }

  refresh() {
    ConnectionHelper.start(this);
  }

  save() {
    let storage = window.localStorage;
    for(let block of this.blocks) {
      storage[block.model.id] = JSON.stringify({
        x: block.x,
        y: block.y
      })
    }
  }

  resize() {
    this.svg.setAttribute('width', window.innerWidth)
    this.svg.setAttribute('height', window.innerHeight)
  }
}