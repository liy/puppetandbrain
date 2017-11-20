class ConnectionHelper
{
  constructor() {
    this.dataUses = [];
  }

  start(graph) {
    this.graph = graph;
    this.drawExecutionConnections();
    this.drawOutputConnections();
  }

  drawExecutionConnections() {

  }


  drawOutputConnections() {

  }
}

export default new ConnectionHelper();