export default class Debounce
{
  constructor(access) {
    this.timeoutIDs = {};
    this.map = {};
    this.access = access;
  }

  filter(id) {
    let pass = !this.map[id];
    
    this.map[id] = true;

    clearTimeout(this.timeoutIDs[id]);
    this.timeoutIDs[id] = setTimeout(() => {
      this.map[id] = false;
    }, Number(this.access.inputs.value('debounce'))*1000);

    return pass;
  }
}