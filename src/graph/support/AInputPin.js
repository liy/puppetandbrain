import './AInputPin.scss';
import ADataPin from "./ADataPin";
import InputField from '../gadgets/InputField'

export default class AInputPin extends ADataPin
{
  constructor(name) {
    super(name, 'in')

    this.setGadget(new InputField());
    this.gadgetVisible = false;

    this.element.className = 'input-pin';
    this.label.addEventListener('mousedown', e => {
      this.gadgetVisible = !this.gadgetVisible
    })
  }

  setGadget(gadget) {
    // remove old gadget
    if(this.gadget) {
      this.head.removeChild(this.gadget.element);
    }

    this.gadget = gadget;
    this.head.appendChild(this.gadget.element);
  }

  set gadgetVisible(flag) {
    this.gadget.visible = flag;
  }

  get gadgetVisible() {
    return this.gadget.visible;
  }
}