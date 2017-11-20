import TaskBlock from "./TaskBlock";

export default class AnimationBlock extends TaskBlock
{
  constructor(model) {
    super(model)

    if(model.inputs.get('name').isLocalPointer) {
      let dropdown = document.createElement('select');
      this.model.owner.getAnimations().then(animations => {
        for(let animation of animations) {
          let option = document.createElement('option');
          option.setAttribute('value', animation.name)
          option.textContent = animation.name
          if(animation.name === this.model.inputs.value('name')) {
            option.setAttribute('selected', 'selected')
          }

          dropdown.appendChild(option)
        }
      })
      this.inputPins['name'].container.appendChild(dropdown)

      dropdown.addEventListener('change', e => {
        this.model.initialState.variables['name'] = this.model.variables['name'] = e.target.value
      });

      // TODO: to be removed
      if(this.inputPins['name'].inputField)
        this.inputPins['name'].container.removeChild(this.inputPins['name'].inputField)
    }
  }
}