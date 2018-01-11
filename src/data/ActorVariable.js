import Variable from "./Variable";

export default class extends Variable
{
  constructor(id) {
    super(id);

    console.log(this.__proto__.data);
  }

  get data() {
    return LookUp.get(this._data);
  }

  set data(v) {
    super.data = v;
  }
}