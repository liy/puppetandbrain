import './FileButton.scss';
import Gadget from './Gadget'
import { svgElement, getMimeType } from '../../utils/utils';
import CloudIcon from '../../assets/cloud-icon.svg';
import FileHashTask from '../../utils/FileHashTask'

export default class extends Gadget
{
  constructor(accept) {
    super();
    this.element.classList.add('file-button');
    this.element.appendChild(svgElement(CloudIcon, {width:29, height:16}));

    let input = document.createElement('input');
    input.type = 'file';
    input.accept = accept
    this.element.appendChild(input);

    this.onUpload = this.onUpload.bind(this);
    input.addEventListener('change', this.onUpload)

    this.element.addEventListener('click', e => {
      input.click();
    });
  }

  async onUpload(e) {
    if(e.target.files.length == 0) return;

    let file = e.target.files[0];
    let ext = file.name.split('.')[1];
    const contentType = getMimeType(ext);

    let hashTask = new FileHashTask();
    let hash = await hashTask.start(file);

    const path = `uploads/${hash}.${ext}`;

    API.uploadData(hashTask.data, hash, path, contentType, Activity.id).then(() => {
      this.emit('file.ready', {
        path,
        data: hashTask.data
      });
    })
  }
}