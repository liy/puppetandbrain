require('./AddActorButton.scss');

export default class AddActorButton
{
  constructor() {
    this.element = document.getElementById('add-actor');
    this.element.style.visibility = 'visible'

    this.element.addEventListener('mousedown', e => {
      History.push(Commander.create('CreateActor', ACTORS[Math.floor(Math.random()*ACTORS.length)]).processAndSave());
    })
  }
}