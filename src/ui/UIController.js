import './UIController.scss'

import AddButton from './AddButton';
import DebugButton from './DebugButton';
import ModeButton from './ModeButton';
import DeleteButton from './DeleteButton';
import EventEmitter from '../utils/EventEmitter';

class UIController extends EventEmitter
{
  constructor() {
    super();

    this.addBtn = new AddButton(this);
    this.debugBtn = new DebugButton(this);
    this.modeBtn = new ModeButton(this);
    this.deleteBtn = new DeleteButton(this);
  }

  stageMode() {
    this.emit('mode.change', 'stage mode')
  }

  brainMode() {
    this.emit('mode.change', 'brain mode')
  }
}

window.UIController = new UIController();