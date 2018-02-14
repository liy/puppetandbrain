import Loader from "./Loader";

export default class SoundLoader extends Loader
{
  static async fetch(fileData) {
    if(Resource.has(fileData.path)) return Promise.resolve(Resource.get(fileData.path))

    let url = fileData.url || await API.getUrl(fileData.path);
    let loader = new SoundLoader(fileData.path || url, url);
    return loader.start();
  }

  constructor(id, url, options) {
    super(id, url, options)
  }

  onSuccess(response) {
    return response.blob().then(blob => {
      return blob;
    })
  }
}