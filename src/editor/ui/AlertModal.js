import Modal from './Modal';

export default class AlertModal extends Modal
{
  static open(content, title) {
    let modal = new AlertModal(content, title);
    modal.secondaryVisiable = false;
    modal.primaryText = 'OK'
    return modal.open();
  }

  constructor(content, title) {
    super();

    this.title.textContent = title;
    this.content.textContent = content;
  }
}