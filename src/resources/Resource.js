import { ContentType } from "../utils/utils";
import JSONLoader from './JSONLoader';
import TextLoader from './TextLoader';
import ImageLoader from './ImageLoader';
import SoundLoader from './SoundLoader';

export const Resource = new Map();

export class LoaderBucket
{
  constructor() {
    this.loaders = [];
  }

  add(id, url, contentType, options=null) {
    if(Resource.has(id)) return;

    switch(contentType) {
      case ContentType.JSON:
        this.loaders.push(new JSONLoader(id, url, options))
        break;
      case ContentType.ATLAS:
        this.loaders.push(new TextLoader(id, url, options))
        break;
      case ContentType.PNG:
      case ContentType.JPG:
        this.loaders.push(new ImageLoader(id, url, options))
        break;
      case ContentType.OGG:
      case ContentType.MP3:
        this.loaders.push(new SoundLoader(id, url, options))
        break;
    }
  }

  start() {
    let promises = this.loaders.map(loader => {
      return loader.start();
    })
    return Promise.all(promises);
  }
}