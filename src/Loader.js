// MimeMap = {
  
// }

export default class Loader extends Map
{
  constructor() {
    super();

    this.tasks = [];
  }

  add(id, url, options) {
    this.tasks.push({
      id, url, options
    });
  }

  start() {
    for(let task of this.tasks) {
      this.load()
    }
  }

  load(id, url, options) {
    return fetch(url, options).then(response => {
      if(response.ok) {
      }
    })
  }
}