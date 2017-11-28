require('./DebugButton.scss')

export default class DebugButton
{
  constructor() {
    this.element = document.getElementById('debug-button');
    this.element.style.visibility = 'visible';

    Stage.on('game.start', () => {
      console.log('!')
      this.element.className = 'debug-stop'
    }, this)

    Stage.on('game.stop', () => {
      this.element.className = 'debug-start'
    }, this)

    this.element.addEventListener('mousedown', e => {
      Stage.toggle();
    })
  }
}