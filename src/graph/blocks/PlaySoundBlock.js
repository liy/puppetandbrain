import TaskBlock from "./TaskBlock";

export default class PlaySoundBlock extends TaskBlock
{
  constructor(node) {
    super(node);

    this.minWidth = 130

    let pin = this.inputPins.get('loop');
    let checkbox = pin.inputElement;
    checkbox.value = node.inputs.value('loop');
    checkbox.classList.add('input-boolean')
    checkbox.readOnly = true;

    checkbox.addEventListener('click', e => {
      checkbox.value = this.node.variables['loop'] = !this.node.variables['loop'];
    })
    pin.updateInputElement();
  }
}