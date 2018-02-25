import EventEmitter from "@/utils/EventEmitter";
import Resource from './Resource';

export default class Loader extends EventEmitter
{
  constructor(resources, id, url, options) {
    super();

    this.resources = resources;
    
    this.id = id;
    this.url = url;
    this.options = options;
  }

  start() {
    return fetch(this.url, this.options||{}).then(response => {
      if(response.ok) {
        // added to the resource
        return this.onSuccess(response).then(data => {
          this.resources.set(this.id, data);
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