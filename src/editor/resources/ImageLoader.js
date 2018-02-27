import Loader from "./Loader";

export default class ImageLoader extends Loader
{
  static async fetch(fileData, resources) {
    resources = resources || ActivityManager.current.resources;
    if(resources.has(fileData.path)) return Promise.resolve(resources.get(fileData.path))
    
    let url = fileData.url || await API.getUrl(fileData.path);
    let loader = new ImageLoader(resources, fileData.path || url, url);
    return loader.start();
  }

  constructor(resources, id, url, options) {
    super(resources, id, url, options)
  }

  onSuccess(response) {
    return response.blob().then(blob => {
      let image = new Image();
      image.crossOrigin = 'Anonymous'
      image.src = URL.createObjectURL(blob);
      return {image, blob, url: this.url};
    })
  }
}