import ListenerBlock from "./ListenerBlock";

export default class KeyboardBlock extends ListenerBlock
{
  constructor(node) {
    super(node);

    this.inputPin = this.inputPins.get('code');
    let inputElement = this.inputPin.inputElement;
    inputElement.addEventListener('keydown', e => {
      e.preventDefault();
      e.stopPropagation();

      e.target.value = e.code;
      node.variables['code'] = e.code
    })
    
    this.minWidth = 125;
  }
}