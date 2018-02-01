import './NotificationControl.scss';
import NotificationChip from './NotificationChip'

class NotificationControl
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'notification-area';

    document.body.appendChild(this.element);
  }

  notify(text) {
    let chip = new NotificationChip(text);
    this.element.prepend(chip.element);
    chip.fadeIn();

    return chip;
  }
}

export default new NotificationControl();