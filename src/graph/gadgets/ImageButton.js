import './ImageButton.scss';
import FileButton from './FileButton';
import API from '../../API';
import ImageLoader from '../../resources/ImageLoader';

export default class extends FileButton
{
  constructor(fileData) {
    super('image/*', fileData.fileName);

    this.element.classList.add('image-button');
    this.image = new Image();
    this.element.appendChild(this.image)

    ImageLoader.fetch(fileData).then(image => {
      this.image.src = image.src;
    })

    this.on('file.ready', ({byteArray, ...other}) => {
      let blob = new Blob([byteArray]);
      this.image.src = URL.createObjectURL(blob);

      this.emit('gadget.state.change', other)
    })
  }
}