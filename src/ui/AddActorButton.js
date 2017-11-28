require('./AddActorButton.scss');

const ACTORS = [
  require('../assets/chicken/chicken.info.json'),
  require('../assets/cow/cow.info.json'),
  require('../assets/donkey/donkey.info.json'),
  require('../assets/horse/horse.info.json'),
  require('../assets/pig/pig.info.json'),
  require('../assets/sheep/sheep.info.json'),
]

export default class AddActorButton
{
  constructor() {
    this.element = document.getElementById('add-actor-button');
    this.element.style.visibility = 'visible'

    this.element.addEventListener('mousedown', e => {
      History.push(Commander.create('CreateActor', ACTORS[Math.floor(Math.random()*ACTORS.length)]).processAndSave());
    })
  }
}