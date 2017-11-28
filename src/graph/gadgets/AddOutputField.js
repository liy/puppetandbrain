export default class AddOutputField
{
  constructor(node) {
    this.node = node;
    this.element = document.createElement('div');

    this.input = document.createElement('input');
    this.input.className = 'add-output-input'
    this.input.setAttribute('placeholder', 'output name');

    let addBtn = document.createElement('div');
    addBtn.className = 'add-output-button';
    addBtn.addEventListener('mousedown', e => {
      let outputName = String.trim(this.input.value);
      if(outputName) {
        this.node.outputs.addOutput(outputName);
        this.input.value = '';
      }
    })

    this.element.appendChild(this.input);
    this.element.appendChild(addBtn)
  }
}