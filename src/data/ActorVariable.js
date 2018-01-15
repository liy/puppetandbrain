import Variable from "./Variable";
import DataType from "./DataType";

export default class extends Variable
{
  constructor(id) {
    super(id);
    this.type = DataType.ACTOR;
  }

  get data() {
    return this._data;
  }

  set data(v) {
    super.data = v;
  }
}