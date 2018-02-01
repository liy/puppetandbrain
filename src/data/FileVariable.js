import Variable from "./Variable";

export default class extends Variable
{
  constructor(id) {
    super(id)

    // authoring time data,
    // even at runtime, user change this variable
    // to reference another file, this will not change
    // 
    // it is for preloading file
    this.path = null;

    this.file = null;
  }

  init(pod) {
    super.init(pod);
    this.fileName = pod.fileName || null;
    this.path = pod.path || null;
  }

  updateRuntime() {
    this.runtime = this.file;
  }

  get data() {
    return this.file;
  }

  set(data) {
    this.file = data;
  }

  pod() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      brainID: this.brain.id,
      // file variable data is created when loading
      data: null,
      fileName: this.fileName,
      path: this.path
    }
  }
}