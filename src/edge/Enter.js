import ArrayMap from "../utils/ArrayMap";

export default class
{
  constructor(name='default') {
    this.name = name;
    // TODO: use map?
    this.callers = new ArrayMap();
    // some task node has no enter, e.g., listener task. Set it to false to disable it
    this.enabled = true;
  }

  connect(caller, executionName) {
    // Multiple executions can link to the same enter.
    // Combine caller id and execution name to indentify the link
    this.callers.set(`${caller.id}.${executionName}`, {
      nodeID: caller.id,
      executionName
    })
  }

  disconnect(caller, executionName) {
    // Note the combination of id and exeuciton name is used
    // for removing the caller information.
    this.callers.remove(`${caller.id}.${executionName}`);
  }

  getCallers() {
    return this.callers.map((key, caller) => {
      return caller;
    })
  }

  get isConnected() {
    return this.callers.length != 0;
  }

  pod() {
    return {
      name: this.name,
      callers: this.getCallers(),
      enabled: this.enabled
    }
  }
}