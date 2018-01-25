import Loader from "./Loader";


export default class extends Loader
{
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