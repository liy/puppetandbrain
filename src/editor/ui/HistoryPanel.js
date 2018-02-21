import './HistoryPanel.scss'

export default class 
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'history-panel';
    this.element.setAttribute('data-title', "Undo Redo");

    this.historyButtons = new DOMParser().parseFromString(require('!raw-loader!@/assets/history-buttons.svg'), "image/svg+xml").rootElement;
    this.historyButtons.setAttribute('height', 100);
    this.element.appendChild(this.historyButtons);

    this.undoButton = this.historyButtons.querySelector('#undo-button')
    this.redoButton = this.historyButtons.querySelector('#redo-button')
  }
}