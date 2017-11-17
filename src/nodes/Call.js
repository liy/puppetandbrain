import Task from './Task'

export default class Call extends Task
{
  /**
   * 
   * @param {String} name Function name
   * @memberof Function
   */
  constructor() {
    super();
  }

  init(data) {
    super.init(data);

    this.variables.callee = data.callee.id;
    this.variables.functionName = data.functionName;

    for(let name of this.function.outputs.names) {
      this.inputs.add(name);
    }
  }

  get function() {
    return LookUp.get(this.variables.callee).functions[this.variables.functionName];
  }

  run() {
    super.run()

    // // Update function's variables, which acts like bridge between Call and Function task
    // for(let name of this.inputs.list) {
    //   // console.log(this.inputs.value(name))
    //   this.function.variables[name] = this.inputs.value(name);
    // }

    // Pass the input value to the function's outputs
    for(let name of this.inputs.list) {
      // console.log(this.inputs.value(name))
      this.function.outputs.data[name] = this.inputs.value(name);
    }


    this.function.run();

    this.execution.run();
  }
}