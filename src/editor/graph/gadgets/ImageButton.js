import './ImageButton.scss';
import FileButton from './FileButton';
import API from '../../API';
import ImageLoader from '../../resources/ImageLoader';
import { getMimeType } from '../../utils/utils';

export default class extends FileButton
{
  constructor(fileData) {
    super('image/*', fileData.fileName);

    this.element.classList.add('image-button');
    this.image = new Image();
    this.element.appendChild(this.image)

    if(fileData.path || fileData.url) {
      ImageLoader.fetch(fileData).then(({image}) => {
        this.image.src = image.src;
      })
    }

    this.on('file.ready', ({byteArray, ...other}) => {
      let blob = new Blob([byteArray], {type: getMimeType(other.ext)});
      this.image.src = URL.createObjectURL(blob);

      this.emit('gadget.state.change', other)
    })
  }
}