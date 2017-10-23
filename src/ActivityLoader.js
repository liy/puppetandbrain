export default class ActivityLoader
{
  constructor() {

  }

  load(url) {
    JSONLoader.load(url).then(data => {
      console.log(data)

      // TODO: parse object first

      // TODO: parse commands
    })
  }

  parseActor() {

  }

  parseTask() {
    
  }
}