import Variable from "./Variable";
import DataType from "./DataType";

export default class extends Variable
{
  constructor(id) {
    super(id);
    this.type = DataType.ACTOR;
  }

  get data() {
    return LookUp.auto(this._data);
  }

  updateRuntime() {
    this.runtime = this.data;
  }

  set data(v) {
    super.data = v;
  }

  pod() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      // Only record the initial data, not the runtime data...
      data: this.data ? this.data.id : null,
      brain: this.brain.id,
    }
  }
}