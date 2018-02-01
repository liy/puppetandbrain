import FileVariable from './FileVariable';
import {Howl, Howler} from 'howler';
import { Resource } from '../resources/Resource';

export default class extends FileVariable
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    // It must be during activity loading or
    // user just created this variable.
    // We will try to get the audio blob data from the resource.
    let blob = Resource.get(this.path);
    this.updateSound(this.path, this.fileName, blob);
  }

  
  updateRuntime() {
    this.runtime = {
      path: this.path,
      fileName: this.fileName,
    };
  }

  get data() {
    return this.file;
  }

  set(data) {
    this.file = data;
  }

  async updateSound(path, fileName, blob=null) {
    this.path = path;
    this.fileName = fileName;
    
    // if(blob) {
    //   this.file = new Howl({
    //     src: [URL.createObjectURL(blob)]
    //   })
    // }
    // else if(this.path){
    //   let url = await API.getUrl(this.path);
    //   this.file = new Howl({
    //     src: [url]
    //   })
    // }
  }
}