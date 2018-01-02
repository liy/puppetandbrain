import Block from "./Block";

export default class KeyboardBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    // TODO: add  keycode gadget
    
    // this.inputPin = this.inputPins.get('code');
    // let inputElement = this.inputPin.inputElement;
    // inputElement.addEventListener('keydown', e => {
    //   e.preventDefault();
    //   e.stopPropagation();

    //   e.target.value = e.code;
    //   node.variables['code'] = e.code
    // })
  }
}