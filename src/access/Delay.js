export default class Delay
{
  constructor() {
    this.timeoutID = 0;
  }

  wait(time) {
    this.isWaiting = true;
    return new Promise((resolve, reject) => {
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        this.isWaiting = false;
        resolve();
      }, time)
    })
  }

  cancel() {
    clearTimeout(this.timeoutID);
    this.isWaiting = false;
  }
}