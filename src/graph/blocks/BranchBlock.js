import TaskBlock from "./TaskBlock";

export default class BranchBlock extends TaskBlock
{
  constructor(node) {
    super(node);

    let pin = this.inputPins.get('condition');
    let checkbox = pin.inputElement;
    checkbox.value = node.inputs.value('condition');
    checkbox.classList.add('input-boolean')
    checkbox.readOnly = true;

    checkbox.addEventListener('click', e => {
      checkbox.value = this.node.variables['condition'] = !this.node.variables['condition'];
    })
  }
}