import './ImageButton.scss';
import FileButton from './FileButton';
import API from '../../API';
import ImageLoader from '../../resources/ImageLoader';

export default class extends FileButton
{
  constructor(path) {
    super('image/*', '');

    this.element.classList.add('image-button');
    this.image = new Image();
    this.element.appendChild(this.image)

    console.log(path)
    if(path) {
      ImageLoader.fetch(path).then(image => {
        this.image.src = image.src;
      })
    }

    this.on('file.ready', result => {
      let blob = new Blob([result.byteArray]);
      this.image.src = URL.createObjectURL(blob);
      this.emit('gadget.state.change', result)
    })
  }
}