import TaskBlock from "./TaskBlock";

export default class AnimationBlock extends TaskBlock
{
  constructor(node) {
    super(node)

    if(node.inputs.get('name').isLocalPointer) {
      let dropdown = document.createElement('select');
      this.node.owner.getAnimations().then(animations => {
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
      this.inputPins.get('name').container.appendChild(dropdown)

      dropdown.addEventListener('change', e => {
        this.node.initialState.variables['name'] = this.node.variables['name'] = e.target.value
      });

      // TODO: to be removed
      if(this.inputPins.get('name').inputField)
        this.inputPins.get('name').container.removeChild(this.inputPins.get('name').inputField)
    }
  }
}