import FileVariable from './FileVariable';
import {Howl, Howler} from 'howler';

export default class extends FileVariable
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.updateSound(this.path, this.fileName);
  }

  async updateSound(path, fileName) {
    this.path = path;
    this.fileName = fileName
    if(this.path) {
      let url = await API.getUrl(path);
      this.file = new Howl({
        src: [url]
      })
    }
  }
}