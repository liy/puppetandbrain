import './FileButton.scss';
import Gadget from './Gadget'
import { svgElement, getMimeType } from '@/utils/utils';
import CloudIcon from '@/assets/cloud-icon.svg';
import FileHashTask from '@/utils/FileHashTask'

export default class extends Gadget
{
  constructor(accept, fileName) {
    super();
    
    this.element.classList.add('file-button');
    this.fileName = fileName;

    this.fileNameSpan = document.createElement('span');
    this.fileNameSpan.textContent = this.fileName || 'Upload';
    this.element.appendChild(this.fileNameSpan);

    // this.icon = svgElement(CloudIcon, {width:29, height:16});
    // this.element.appendChild(this.icon);

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

    // TODO: change the default alert with custom modal
    // if(file.size > 1024*1024*8) {
    //   window.alert('Cannot upload file larger than 8MB')
    //   return;
    // }

    this.fileNameSpan.textContent = 'Uploading...';
    this.emit('file.begin');

    let ext = file.name.split('.').pop().toLowerCase();
    const contentType = getMimeType(ext);

    let hashTask = new FileHashTask();
    let hash = await hashTask.start(file);

    const path = `uploads/${hash}.${ext}`;

    API.uploadFile(hashTask.data, hash, ext, path, contentType, Activity.id, 
      (snapshot) => {
        let progress = snapshot.bytesTransferred/snapshot.totalBytes;
        this.emit('file.progress', progress)  
      },
      (error) => {
        this.emit('file.error', error);
      }
    ).then(async () => {
      this.emit('file.progress', 1);
      // this.icon.style.display = 'none'
      this.fileNameSpan.textContent = file.name;

      // this is a signed url, try to keep it in the data,
      // so we can load image directly using the url
      let url = await API.getUrl(path);

      this.emit('file.ready', {
        fileName: file.name,
        contentType,
        byteArray: hashTask.data,
        hash,
        ext,
        path,
        url,
      });
    })
  }
}