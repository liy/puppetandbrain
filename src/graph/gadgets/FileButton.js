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
    this.element.addEventListener('change', this.onUpload)
  }

  async onUpload(e) {
    let file = e.target.files[0];
      let ext = file.name.split('.')[1];
      const contentType = getMimeType(ext);

      let hashTask = new FileHashTask();
      let hash = await hashTask.start(file);

      const path = `uploads/${hash}.${ext}`;

      API.uploadData(hashTask.data, hash, path, contentType, Activity.id).then(() => {
        this.emit('file.uploaded', {
          path,
          data: hashTask.data
        });
      })
  }
}