import ADataPin from "./ADataPin";
import InputField from '../gadgets/InputField'

export default class AInputPin extends ADataPin
{
  constructor(name) {
    super(name, 'in')

    this.setGadget(new InputField());
    this.gadgetVisible = false;

    this.element.addEventListener('mouseover', e => {
      this.gadgetVisible = true;
    })
    this.element.addEventListener('mouseout', e => {
      this.gadgetVisible = false;
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
    this.symbol.visible = !flag;
    this.gadget.visible = flag;
  }
}