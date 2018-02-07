import { ContentType } from "../utils/utils";
import JsonLoader from './JsonLoader';
import TextLoader from './TextLoader';
import ImageLoader from './ImageLoader';
import SoundLoader from './SoundLoader';

export const Resource = new Map();

// place holder hour glass
let image = new Image();
image.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0iI0NDQ0NDQyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik02My41NjgsNDMuOTczYzUuNTEyLTUuNDQzLDExLjc1LTExLjYwNCwxMS45MDYtMjAuODA0YzAuMDE3LTAuMTE3LDAuMDI1LTAuMjM2LDAuMDI1LTAuMzU4VjEwaDExLjA2M1YwaC0yLjVIMTUuOTM4aC0yLjUgIHYxMEgyNC41djEyLjgxMWMwLDAuMTEyLDAuMDA3LDAuMjIzLDAuMDIyLDAuMzMxYzAuMTIsOS41MjEsNi42OTcsMTUuOTIyLDEyLjUxLDIxLjU3OWMxLjAzNywxLjAwOSwxLjE1NywzLjQyOSwxLjE1Nyw1LjE2MSAgYzAsMS4wMzUsMCw0LjE4Ni0xLjMwNiw1LjQzOGMtNS40NjcsNS4yMzctMTIuMjYsMTEuNzQ2LTEyLjM2MiwyMS41MzdjLTAuMDE0LDAuMTA4LTAuMDIxLDAuMjE5LTAuMDIxLDAuMzMxVjkwSDEzLjQzOHYxMGgyLjUgIGg2OC4xMjVoMi41VjkwSDc1LjVWNzcuMTg4YzAtMC4xMTEtMC4wMDgtMC4yMi0wLjAyMS0wLjMyN2MtMC4xMDQtOS45MDMtNy4yMDEtMTYuNjM3LTEyLjM5My0yMS41NjMgIGMtMC45MTEtMC44NjUtMS4zNzQtMi43OTktMS4zNzQtNS43NDdjMC0xLjgwOSwwLjA3MS0zLjgwOSwwLjkxNy00LjY0OUw2My41NjgsNDMuOTczeiBNNjUuNDc5LDc2Ljk2NmwwLjAwNiwwLjU4MmwwLjAxNSwwLjExN1Y3OCAgaC0zMXYtMC4zMjdsMC4wMTUtMC4xMTNsMC4wMDYtMC41OTljMC4wNTQtNS4xOTcsMy43MS05LjA4Myw5LjI4My0xNC40MjNjMy43OTQtMy42MzgsNC4zNDgtOC42NjIsNC4zODEtMTIuMjdoMy41MzIgIGMwLjA3NSwzLjY5MiwwLjc0LDguNzI5LDQuNDg2LDEyLjI4NUM2MC41MjMsNjYuNjUyLDY1LjQyLDcxLjI5OCw2NS40NzksNzYuOTY2eiBNMzYuOTc0LDI5Ljg1NCAgYy0xLjU1NC0yLjIzNC0yLjQyMi00LjM5NS0yLjQ1My02LjgzOGwtMC4wMDgtMC42MWwtMC4wMTMtMC4xVjEwaDMxdjEyLjI4M2wtMC4wMTMsMC4wOTRsLTAuMDExLDAuNjIxICBjLTAuMDQyLDIuNDUxLTAuOTQ4LDQuNjA0LTIuNTYxLDYuODU1SDM2Ljk3NHoiLz48L3N2Zz4=";
Resource.set('$hourglass', image);

window.Resource = Resource;

export class LoaderBucket
{
  constructor() {
    this.loaders = [];
  }

  add(id, url, contentType, options=null) {
    if(Resource.has(id)) return;

    switch(contentType) {
      case ContentType.JSON:
        this.loaders.push(new JsonLoader(id, url, options))
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
      case ContentType.WAV:
      case ContentType.FLAC:
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