import TaskBlock from "./TaskBlock";

export default class AnimationBlock extends TaskBlock
{
  constructor(node) {
    super(node)

    let nameInput = this.inputPins.get('name');
    nameInput.container.removeChild(nameInput.inputElement)
    
    let pointer = node.inputs.get('name');
    let dropdown = nameInput.inputElement = document.createElement('select');
    this.node.owner.getAnimations().then(animations => {
      this.node.initialState.variables['name'] = this.node.variables['name'] = animations[0].name;
      nameInput.updateInputElement();
      for(let animation of animations) {
        let option = document.createElement('option');
        option.setAttribute('value', animation.name)
        option.textContent = animation.name
        if(animation.name === this.node.inputs.value('name')) {
          option.setAttribute('selected', 'selected')
        }
        dropdown.appendChild(option)
      }
    })
    dropdown.addEventListener('change', e => {
      this.node.initialState.variables['name'] = this.node.variables['name'] = e.target.value
      nameInput.updateInputElement();
    });
    nameInput.container.appendChild(dropdown);
  }
}