import Tutorial from './Tutorial';

class AnimatePuppet extends Tutorial
{
  constructor() {
    super();
  }

  start() {
    let button = document.getElementById('add-actor-button');
    this.cursor.moveTo(button)
    this.cursor.fadeIn();
  }
}

export default new AnimatePuppet();