import Loader from "./Loader";


export default class ImageLoader extends Loader
{
  static async fetch(fileData) {
    if(Resource.has(fileData.path)) return Promise.resolve(Resource.get(fileData.path))
    let url = fileData.url || await API.getUrl(fileData.path);
    let loader = new ImageLoader(fileData.path || url, url);
    return loader.start();
  }

  constructor(id, url, options) {
    super(id, url, options)
  }

  onSuccess(response) {
    return response.blob().then(blob => {
      let image = new Image();
      image.src = URL.createObjectURL(blob);
      return image;
    })
  }
}