import Loader from "./Loader";

export default class SoundLoader extends Loader
{
  static async fetch(fileData, resources=ActivityManager.current.resources) {
    if(resources.has(fileData.path)) return Promise.resolve(resources.get(fileData.path))

    let url = fileData.url || await API.getUrl(fileData.path);
    let loader = new SoundLoader(resources, fileData.path || url, url);
    return loader.start();
  }

  constructor(resources, id, url, options) {
    super(resources, id, url, options)
  }

  onSuccess(response) {
    return response.blob().then(blob => {
      return blob;
    })
  }
}