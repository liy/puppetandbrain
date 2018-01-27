import './ControlPanel.scss'

import AddButton from './AddButton';
import DebugButton from './DebugButton';
import BrainButton from './BrainButton';
import DeleteButton from './DeleteButton';

export default class ControlPanel
{
  constructor() {
    this.element = document.getElementById('control-panel');

    this.addButton = new AddButton();
    this.debugButton = new DebugButton();
    this.brainBtn = new BrainButton();
    this.deleteBtn = new DeleteButton();

    this.stageMode();
  }

  stageMode() {
    this.brainBtn.show();
    this.deleteBtn.stageMode()
  }

  graphMode() {
    this.brainBtn.hide();
    this.deleteBtn.graphMode()
  }
}