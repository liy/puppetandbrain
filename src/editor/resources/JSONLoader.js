import Loader from "./Loader";

export default class extends Loader
{
  constructor(resources, id, url, options) {
    super(resources, id, url, options)
  }

  onSuccess(response) {
    return response.json()
  }
}