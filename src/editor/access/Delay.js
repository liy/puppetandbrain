export default class Delay
{
  constructor() {
    this.timeoutID = 0;
  }

  wait(miniSeconds) {
    this.isWaiting = true;
    return new Promise((resolve, reject) => {
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        this.isWaiting = false;
        resolve();
      }, miniSeconds)
    })
  }

  cancel() {
    clearTimeout(this.timeoutID);
    this.isWaiting = false;
  }
}