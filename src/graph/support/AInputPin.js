import './AInputPin.scss';
import ADataPin from "./ADataPin";
import TextField from '../gadgets/TextField'
import InputSymbol from './InputSymbol';

export default class AInputPin extends ADataPin
{
  constructor(name) {
    super(name, 'in')

    this.connectionChanged = this.connectionChanged.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
  }

  init(node) {
    super.init(node);

    this.setGadget(new TextField(node, this.name));

    this.label.addEventListener('mousedown', this.mouseDown)
    
    this.pointer = this.node.inputs.get(this.name);
    if(!this.pointer.isConnected) {
      this.label.classList.add('clickable');
    }
    this.pointer.on('input.connected', this.connectionChanged);
    this.pointer.on('input.disconnected', this.connectionChanged);
  }

  destroyed() {
    this.gadget.destroy();
    this.label.removeEventListener('mousedown', this.mouseDown)
    this.pointer.off('input.connected', this.connectionChanged);
    this.pointer.off('input.disconnected', this.connectionChanged);
  }

  setGadget(gadget) {
    // remove old gadget
    if(this.gadget) {
      this.gadget.destroy();
      this.head.removeChild(this.gadget.element);
    }

    this.gadget = gadget;
    this.gadget.init(this.node, this.name);
    this.gadget.visible = false;
    this.head.appendChild(this.gadget.element);
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