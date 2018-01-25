import { ContentType } from "../utils/utils";
import JSONLoader from './JSONLoader';
import TextLoader from './TextLoader';
import ImageLoader from './ImageLoader';
import SoundLoader from './SoundLoader';

class Resource extends Map
{
  constructor() {
    super();

    this.loaders = [];
  }

  add(id, url, contentType) {
    switch(contentType) {
      case ContentType.JSON:
        this.loaders.push(new JSONLoader(id, url))
        break;
      case ContentType.ATLAS:
        this.loaders.push(new TextLoader(id, url))
        break;
      case ContentType.PNG:
      case ContentType.JPG:
        this.loaders.push(new ImageLoader(id, url))
        break;
      case ContentType.OGG:
      case ContentType.MP3:
        this.loaders.push(new SoundLoader(id, url))
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

window.Resource = new Resource();