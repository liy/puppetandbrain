import './AInputPin.scss';
import ADataPin from "./ADataPin";
import InputField from '../gadgets/InputField'
import InputSymbol from '../gadgets/InputSymbol';

export default class AInputPin extends ADataPin
{
  constructor(name) {
    super(name, 'in')

    this.connectionChanged = this.connectionChanged.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
  }

  init(node) {
    super.init(node);

    this.setGadget(new InputField());

    this.element.addEventListener('mousedown', this.mouseDown)
    
    this.pointer = this.node.inputs.get(this.name);
    if(!this.pointer.isConnected) {
      this.element.classList.add('clickable');
    }
    this.pointer.on('input.connected', this.connectionChanged);
    this.pointer.on('input.disconnected', this.connectionChanged);
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

  setGadget(gadget) {
    // remove old gadget
    if(this.gadget) {
      this.head.removeChild(this.gadget.element);
    }

    this.gadget = gadget;
    this.gadget.visible = false;
    this.head.appendChild(this.gadget.element);
  }

  set gadgetVisible(flag) {
    this.gadget.visible = flag;
  }

  get gadgetVisible() {
    return this.gadget.visible;
  }
}