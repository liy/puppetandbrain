import './InputPin.scss';
import DataPin from "./DataPin";
import TextField from '../gadgets/TextField'
import InputField from '../gadgets/InputField'
import AudioField from '../gadgets/AudioField'
import Vec2Field from '../gadgets/Vec2Field'
import ActorPicker from '../gadgets/ActorPicker'
import ColorButton from '../gadgets/ColorButton'
import ImageButton from '../gadgets/ImageButton'
import Toggle from '../gadgets/Toggle';
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
    this.input = node.inputs.get(this.name);
    let data = node.getGadgetConstructorData(this.name);
    let gadgetClassName = this.input.descriptor.gadgetClassName;
    if(!this.input.descriptor.gadgetDisabled) {
      if(gadgetClassName) {
        this.setGadget(new gadgetClasses[gadgetClassName](data));
      }
      else {
        switch(this.input.type) {
          case DataType.GENERIC:
            this.setGadget(new TextField(data));
            break;
          case DataType.BOOLEAN:
            this.setGadget(new Toggle(data));
            break;
          case DataType.DOUBLE:
            this.setGadget(new InputField(data, 'number'));
            this.gadget.input.step = 0.01;
            break;
          case DataType.INTEGER:
            this.setGadget(new InputField(data, 'number'));
            break;
          case DataType.STRING:
            this.setGadget(new TextField(data));
            break;
          case DataType.ACTOR:
            this.setGadget(new ActorPicker(data));
            break;
          case DataType.COLOR:
            this.setGadget(new ColorButton(data));
            break;
          case DataType.ARRAY:
            // this.setGadget(new ColorButton(data));
            break;
          case DataType.VEC2:
            this.setGadget(new Vec2Field(data));
            break;
          case DataType.MAP:
            // this.setGadget(new TextField(data));
            break;
          case DataType.AUDIO:
            this.setGadget(new AudioField(data||{}));
            break;
          case DataType.IMAGE:
            this.setGadget(new ImageButton(data));
            break;
          default:
            this.setGadget(new TextField(data));
            break;
        }
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
      if(Math.abs(downX - e.clientX) < 10 && Math.abs(downY - e.clientY) < 10) {
        this.labelClicked();
      }
    })

    this.input.on('input.connected', this.connectionChanged, this);
    this.input.on('input.disconnected', this.connectionChanged, this);
    this.input.on('input.type.change', this.inputTypeChanged, this);
    this.connectionChanged();
  }

  destroy() {
    // this will remove all listeners as well
    if(this.gadget) this.gadget.destroy();
    this.label.removeEventListener('click', this.labelClicked);
    this.input.off('input.connected', this.connectionChanged, this);
    this.input.off('input.disconnected', this.connectionChanged, this);
    this.input.off('input.type.change', this.inputTypeChanged, this);
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
      // only if there is a gadget to open
      if(this.gadget) this.label.classList.add('clickable');
    }
  }

  inputTypeChanged(type) {
    this.symbol.refresh(type);
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