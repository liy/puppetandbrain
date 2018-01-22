require('./AddActorButton.scss');
import AddActorIcon from '../assets/add-actor.svg';
import {svgElement} from '../utils/utils';
import PuppetBrowser from '../browser/PuppetBrowser';

const ACTORS = [
  // require('../assets/chicken/chicken.info.json'),
  // require('../assets/cow/cow.info.json'),
  // require('../assets/donkey/donkey.info.json'),
  // require('../assets/horse/horse.info.json'),
  // require('../assets/pig/pig.info.json'),
  // require('../assets/sheep/sheep.info.json'),
  // require('../assets/goat/goat.info.json'),
  // require('../assets/duck/duck.info.json'),
  require('../assets/cat/cat.info.json'),
  require('../assets/mice/mice.info.json'),
]


export default class AddActorButton
{
  constructor() {
    this.element = document.getElementById('add-actor-button');
    this.element.style.visibility = 'visible';
    this.element.appendChild(svgElement(AddActorIcon));

    this.element.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      // History.push(Commander.create('CreateActor', ACTORS[Math.floor(Math.random()*ACTORS.length)]).processAndSave());

      var browser = new PuppetBrowser();
      browser.open()
    })
  }
}