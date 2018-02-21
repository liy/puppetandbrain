import EventEmitter from "@/utils/EventEmitter";
import {Resource} from './Resource';

export default class Loader extends EventEmitter
{
  constructor(id, url, options) {
    super();

    this.id = id;
    this.url = url;
    this.options = options;
  }

  start() {
    return fetch(this.url, this.options||{}).then(response => {
      if(response.ok) {
        // added to the resource
        return this.onSuccess(response).then(data => {
          Resource.set(this.id, data);
          return data;
        })
      }
      // TODO: handle error..... whatever...
    })
  }

  onSuccess(response) {
    // TODO: to be implemented.
  }
}