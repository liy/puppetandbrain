import HashManager from "./HashManager";

export default class
{
  constructor() {
    // FIXME: get an proper id...
    this.id = (Date.now() + Math.round(Math.random()*1000));
  }

  start(file) {
    return new Promise(resolve => {
      this.resolve = resolve;

      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        this.data = reader.result;
        HashManager.add(this);
      }
    });
  }
}