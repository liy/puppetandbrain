import Loader from "./Loader";

console.log(Loader)

export default class extends Loader
{
  constructor(id, url, options) {
    super(id, url, options)
  }

  onSuccess(response) {
    return response.json()
  }
}