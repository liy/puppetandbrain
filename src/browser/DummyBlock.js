require('./DummyBlock.scss')
import ArrayMap from "../utils/ArrayMap";
import DummyExecutionPin from './DummyExecutionPin';
import DummyDataPin from './DummyDataPin';
import DataPin from '../graph/DataPin';
import EventEmitter from '../utils/EventEmitter';

// FIXME: I need a better way to handle the block layout!!!
export default class DummyBlock extends EventEmitter
{
  constructor(data) {
    super();

    this.data = data;
    this.rows = [];

    this.gridBox = document.createElement('div');
    this.gridBox.className = `grid-box`;

    this.element = document.createElement('div');
    this.element.className = 'dummy-block';
    this.gridBox.appendChild(this.element);

    this.title = document.createElement('div');
    this.title.className = 'dummy-title'
    this.element.appendChild(this.title);
    this.title.textContent = this.data.name;

    this.content = document.createElement('div');
    this.content.className = `dummy-content ${data.pod.className.toLowerCase()}-block`;
    this.element.appendChild(this.content);
    this.content.style.minWidth = data.minWidth+'px';

    this.hitArea = document.createElement('div');
    this.hitArea.className = 'hit-area';
    this.element.appendChild(this.hitArea)


    if(this.data.in) {
      let pin = new DummyExecutionPin('', 'left');
      this.getRow(0).appendChild(pin.container);
    }
    this.getRow(0)

    // out pins
    for(let i=0; i<this.data.out.length; ++i) {
      let executionName = this.data.out[i]
      let pin = new DummyExecutionPin(executionName, 'right');
      this.getRow(i).appendChild(pin.container)
    }

    // usually it is from the variable.
    let inputNames = [];
    if(this.data.pod.variables) {
      inputNames = inputNames.concat(Object.keys(this.data.pod.variables));
    }
    if(this.data.inputs) {
      inputNames = inputNames.concat(this.data.inputs);
    }
    for(let i=0; i<inputNames.length; ++i) {
      let name = inputNames[i];
      let pin = new DummyDataPin(name, 'left')
      // Always avoid first row, for input. Looks better
      // data node
      if(this.data.out.length == 0){
        this.getRow(i).appendChild(pin.container);
      }
      else {
        this.getRow(i+1).appendChild(pin.container);
      }
    }

    for(let i=0; i<this.data.outputs.length; ++i) {
      let name = this.data.outputs[i];
      let pin = new DummyDataPin(name, 'right');
      this.getRow(this.data.out.length + i).appendChild(pin.container);
    }

    this.pointerdown = this.pointerdown.bind(this);
    // Note the capture phase I'm using, I stop the propagation immediately which stop other
    // elements receiving mouse down event. So that I can eaily assume that only hit area will
    // receive this mouse down event.
    this.hitArea.addEventListener('mousedown', this.pointerdown, true);
  }

  pointerdown(e) {
    e.preventDefault();
    e.stopPropagation();
    
    this.emit('block.chosen', this.data.pod);
  }

  getRow(i) {
    if(!this.rows[i]) {
      this.rows[i] = document.createElement('div');
      this.rows[i].className = 'dummy-row';
      this.content.appendChild(this.rows[i]);
    }
    return this.rows[i]
  }
}