import Modal from './Modal';

export default class ConfirmModal extends Modal
{
  static open(content, title) {
    let modal = new ConfirmModal(content, title);
    return modal.open();
  }

  constructor(content, title='Are you Sure?') {
    super();

    this.title.textContent = title;
    this.content.textContent = content;
  }
}