import './UIController.scss'

import AddButton from './AddButton';
import DebugButton from './DebugButton';
import ModeButton from './ModeButton';
import DeleteButton from './DeleteButton';
import EventEmitter from '@/utils/EventEmitter';
import ElementController from '../graph/elements/ElementController'
import Menu from './Menu';

class UIController extends EventEmitter
{
  constructor() {
    super();

    this.controlPanel = document.getElementById('control-panel');

    this.addBtn = new AddButton(this);
    this.debugBtn = new DebugButton(this);
    this.modeBtn = new ModeButton(this);
    this.deleteBtn = new DeleteButton(this);
    this.menu = new Menu();
  }

  stageMode() {
    this.emit('mode.change', 'stage mode')
    this.controlShifted = false;
  }

  brainMode() {
    this.emit('mode.change', 'brain mode');
    this.controlShifted = ElementController.panel.visible;
  }

  set controlShifted(v) {
    if(v) {
      this.controlPanel.style.transform = `translateX(${-ElementController.panel.width}px)`
      this.menu.element.style.transform = `translateX(${-ElementController.panel.width}px)`
    }
    else {
      this.controlPanel.style.transform = `translateX(0)`
      this.menu.element.style.transform = `translateX(0)`
    }
  }
}

window.UIController = new UIController();