import Loader from "./Loader";

export default class extends Loader
{
  constructor(id, url, options) {
    super(id, url, options)
  }

  onSuccess(response) {
    return response.text();
  }
}