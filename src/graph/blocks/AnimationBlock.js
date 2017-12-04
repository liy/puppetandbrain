import TaskBlock from "./TaskBlock";

export default class AnimationBlock extends TaskBlock
{
  constructor(node) {
    super(node)

    let nameInput = this.inputPins.get('name');

    let pointer = node.inputs.get('name');
    let dropdown = document.createElement('select');
    nameInput.setInputElement(dropdown);
    this.node.owner.getAnimations().then(animations => {
      nameInput.updateInputElement();

      let exist = animations.find(animation => {
        return animation.name == node.inputs.value('name');
      })

      // if pod animation for some reason does not exist in the animation.
      // set it to the first animation
      if(!exist) {
        this.node.initialState.variables['name'] = this.node.variables['name'] = animations[0].name;
      }

      for(let animation of animations) {
        let option = document.createElement('option');
        option.setAttribute('value', animation.name)
        option.textContent = animation.name
        dropdown.appendChild(option)
      }
      dropdown.value = this.node.inputs.value('name');
    })
    dropdown.addEventListener('change', e => {
      this.node.initialState.variables['name'] = this.node.variables['name'] = e.target.value
      nameInput.updateInputElement();
    });
  }
}