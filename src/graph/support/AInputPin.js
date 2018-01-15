import './AInputPin.scss';
import ADataPin from "./ADataPin";
import TextField from '../gadgets/TextField'
import InputSymbol from './InputSymbol';

export default class AInputPin extends ADataPin
{
  constructor(name) {
    super(name, 'in')

    // for veritcally centre the gadget
    this.gadgetContainer = document.createElement('div');
    this.gadgetContainer.className = 'gadget-container';
    this.head.appendChild(this.gadgetContainer)

    this.connectionChanged = this.connectionChanged.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
  }

  init(node) {
    super.init(node);

    this.setGadget(new TextField(node.memory[this.name], this.name));

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
    this.gadget.destroy();
    this.label.removeEventListener('mousedown', this.mouseDown);
    this.pointer.off('input.connected', this.connectionChanged);
    this.pointer.off('input.disconnected', this.connectionChanged);
  }

  setGadget(gadget) {
    // remove old gadget
    if(this.gadget) {
      // destroy will clear all the listeners
      this.gadget.destroy();
      this.gadgetContainer.removeChild(this.gadget.element);
    }

    this.gadget = gadget;
    this.gadget.visible = false;
    this.gadgetContainer.appendChild(this.gadget.element);

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
      this.gadget.visible = false;
      this.element.classList.remove('clickable');
    }
    else {
      this.element.classList.add('clickable');
    }
  }

  mouseDown() {
    // only be able toggle the gadget if input is NOT connected
    if(this.pointer.isConnected) return;

    this.gadgetVisible = !this.gadgetVisible;
    this.symbol.drawConnection();
  }

  set gadgetVisible(flag) {
    this.gadget.visible = flag;
  }

  get gadgetVisible() {
    return this.gadget.visible;
  }
}