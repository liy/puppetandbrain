export default class Debounce
{
  constructor(debounce) {
    this.timeoutIDs = {};
    this.map = {};
    this.debounce = debounce || 0;
  }

  filter(id) {
    let pass = !this.map[id];
    
    this.map[id] = true;

    clearTimeout(this.timeoutIDs[id]);
    this.timeoutIDs[id] = setTimeout(() => {
      this.map[id] = false;
    }, this.debounce);

    return pass;
  }
}