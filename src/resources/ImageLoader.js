import Loader from "./Loader";


export default class ImageLoader extends Loader
{
  static async fetch(path) {
    if(Resource.has(path)) return Promise.resolve(Resource.get(path))
    let url = await API.getUrl(path);
    let loader = new ImageLoader(path, url);
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