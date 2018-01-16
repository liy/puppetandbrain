import './InputPin.scss';
import DataPin from "./DataPin";
import TextField from '../gadgets/TextField'
import PositionField from '../gadgets/PositionField'
import ActorPicker from '../gadgets/ActorPicker'
import ColorButton from '../gadgets/ColorButton'
import InputSymbol from './InputSymbol';
import DataType from '../../data/DataType';

export default class extends DataPin
{
  constructor(name, label=name) {
    super(name, 'in', label)

    this.connectionChanged = this.connectionChanged.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
  }

  init(node) {
    super.init(node);

    // setup gadget
    let input = node.inputs.get(this.name);
    let data = node.memory[this.name];
    switch(input.type) {
      case DataType.VEC2:
        this.setGadget(new PositionField(data.x,data.y));
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
      default:
        this.setGadget(new TextField(data));
        break;
    }

    this.label.addEventListener('mousedown', this.mouseDown)
    
    this.pointer = this.node.inputs.get(this.name);
    if(!this.pointer.isConnected) {
      this.label.classList.add('clickable');
    }
    this.pointer.on('input.connected', this.connectionChanged);
    this.pointer.on('input.disconnected', this.connectionChanged);
  }

  destroy() {
    // this will remove all listeners as well
    if(this.gadget) this.gadget.destroy();
    this.label.removeEventListener('mousedown', this.mouseDown);
    this.pointer.off('input.connected', this.connectionChanged);
    this.pointer.off('input.disconnected', this.connectionChanged);
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
      // However, in setter block, this.name is actually a property id. Because user
      // can change property name on the fly, it is better to use fixed id.
      // It is hard to read, maybe an extra optional field "dataID" instead of "name"?
      this.node.memory[this.name] = value;
    });
  }

  connectionChanged(data) {
    if(this.pointer.isConnected) {
      if(this.gadget) this.gadget.visible = false;
      this.element.classList.remove('clickable');
    }
    else {
      this.element.classList.add('clickable');
    }
  }

  mouseDown() {
    // only be able toggle the gadget if input is NOT connected
    // or has no gadget
    if(this.pointer.isConnected || !this.gadget) return;

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

  template(pod) {
    
  }
}