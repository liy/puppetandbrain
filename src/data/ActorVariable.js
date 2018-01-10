import Variable from "./Variable";

export default class extends Variable
{
  constructor(id) {
    super(id);
  }

  get data() {
    return LookUp.get(this._data);
  }
}