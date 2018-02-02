import './InputPin.scss';
import DataPin from "./DataPin";
import TextField from '../gadgets/TextField'
import AudioField from '../gadgets/AudioField'
import PositionField from '../gadgets/PositionField'
import ActorPicker from '../gadgets/ActorPicker'
import ColorButton from '../gadgets/ColorButton'
import InputSymbol from './InputSymbol';
import DataType from '../../data/DataType';

import * as gadgetClasses from '../gadgets';

export default class extends DataPin
{
  constructor(name, label=name) {
    super(name, 'in', label)
  }

  init(node) {
    super.init(node);

    // setup gadget
    let input = node.inputs.get(this.name);
    let data = node.memory[this.name];
    let gadgetClassName = input.descriptor.gadgetClassName;
    if(gadgetClassName) {
      this.setGadget(new gadgetClasses[gadgetClassName](data));
    }
    else {
      switch(input.type) {
        case DataType.VEC2:
          this.setGadget(new PositionField(data));
          break;
        case DataType.COLOR:
          this.setGadget(new ColorButton(data));
          break;
        case DataType.ACTOR:
          this.setGadget(new ActorPicker(data));
          break;
        case DataType.GENERIC:
          this.setGadget(new TextField(data));
          break;
        case DataType.AUDIO:
          this.setGadget(new AudioField(data||{}));
          break;
        default:
          this.setGadget(new TextField(data));
          break;
      }
    }
    

    // simulate click event, since block.parent.appendChild(block) cancels any children's click events.
    let downX = null;
    let downY = null;
    this.label.addEventListener('mousedown', e => {
      downX = e.clientX;
      downY = e.clientY;
    })
    this.label.addEventListener('mouseup', e => {
      if(downX === e.clientX && downY === e.clientY) {
        this.labelClicked();
      }
    })
    
    this.input = this.node.inputs.get(this.name);
    if(!this.input.isConnected) {
      this.label.classList.add('clickable');
    }
    this.input.on('input.connected', this.connectionChanged, this);
    this.input.on('input.disconnected', this.connectionChanged, this);
  }

  destroy() {
    // this will remove all listeners as well
    if(this.gadget) this.gadget.destroy();
    this.label.removeEventListener('click', this.labelClicked);
    this.input.off('input.connected', this.connectionChanged, this);
    this.input.off('input.disconnected', this.connectionChanged, this);
  }

  setGadget(gadget) {
    // remove old gadget
    if(this.gadget) {
      // destroy will clear all the listeners
      this.gadget.destroy();
      this.head.removeChild(this.gadget.element);
    }

    this.gadget = gadget;
    this.gadget.visible = false;
    this.head.appendChild(this.gadget.element);

    // TODO: the gadget state change is quite generic,
    // this simple node memory update should do the job
    // If not, it is still possible to clear the gadget old listener
    // setup a specific one in the specific block. 
    this.gadget.on('gadget.state.change', value => {
      // Note that, by default, it is a simple pin name which is enougth to identify
      // the pin and corresponding data.
      // setter block's name is actually called "input", and it is fixed.
      this.node.memory[this.name] = value;
    });
  }

  connectionChanged(data) {
    if(this.input.isConnected) {
      if(this.gadget) this.gadget.visible = false;
      this.label.classList.remove('clickable');
    }
    else {
      this.label.classList.add('clickable');
    }
  }

  labelClicked() {
    // only be able toggle the gadget if input is NOT connected
    // or has no gadget
    if(this.input.isConnected || !this.gadget) return;

    this.gadgetVisible = !this.gadgetVisible;

    // update the link path
    this.symbol.drawConnection();
  }

  set gadgetVisible(flag) {
    this.gadget.visible = flag;
  }

  get gadgetVisible() {
    return this.gadget.visible;
  }
}