import Loader from "./Loader";

export default class extends Loader
{
  constructor(id, url, options) {
    super(id, url, options)
  }

  onSuccess(response) {
    return response.blob().then(blob => {
      return new Audio(URL.createObjectURL(blob));
    })
  }
}