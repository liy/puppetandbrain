import { ContentType } from "@/utils/utils";
import JsonLoader from './JsonLoader';
import TextLoader from './TextLoader';
import ImageLoader from './ImageLoader';
import SoundLoader from './SoundLoader';

export default class LoaderBucket
{
  constructor(resources) {
    this.loaders = [];
    this.resources = resources;
  }

  add(id, url, contentType, options=null) {
    if(this.resources.has(id)) return;

    switch(contentType) {
      case ContentType.JSON:
        this.loaders.push(new JsonLoader(resources, id, url, options))
        break;
      case ContentType.ATLAS:
        this.loaders.push(new TextLoader(resources, id, url, options))
        break;
      case ContentType.PNG:
      case ContentType.JPG:
        this.loaders.push(new ImageLoader(resources, id, url, options))
        break;
      case ContentType.OGG:
      case ContentType.MP3:
      case ContentType.WAV:
      case ContentType.FLAC:
        this.loaders.push(new SoundLoader(resources, id, url, options))
        break;
    }
  }

  start() {
    let promises = this.loaders.map(loader => {
      return loader.start(this);
    })
    return Promise.all(promises);
  }
}