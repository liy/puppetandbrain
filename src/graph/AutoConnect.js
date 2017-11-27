export default 
{
  process(pin, createdNode) {
    let inNode = pin.node;
    let isExecutionPin = pin.type=='in' || pin.type=='out';
    let connectParent = pin.type=='in' || pin.type=='input';
    
    // If dragging from execution pin and target node has execution pin
    // connect execution pin
    if(isExecutionPin && createdNode.execution) {
      let executionName = pin.name;
      let sourceNode = pin.node;
      let targetNode = createdNode;
      if(connectParent) {
        executionName = createdNode.execution.contains('default') ? 'default' : createdNode.execution.keys[0];
        sourceNode = createdNode;
        targetNode = pin.node;
      }
      // target node has no execution in, do not connect
      else if(!targetNode.hasIn){
        return;
      }
      History.push(Commander.create('CreateExecution', sourceNode.id, executionName, targetNode.id).processAndSave());
    }
    // If dragging from data pin, connect data pin only
    else if(!isExecutionPin){
      // connect to first ouput if any
      if(connectParent) {
        let firstOutput = createdNode.outputs.get(createdNode.outputs.names[0]);
        if(firstOutput) {
          console.log(pin.node, pin.name, createdNode, firstOutput.name)
          History.push(Commander.create('CreateDataLink', pin.node.id, pin.name, createdNode.id, firstOutput.name).processAndSave())
        }
      }
      else {
        let firstInput = createdNode.inputs.get(createdNode.inputs.names[0]);
        if(firstInput) {
          History.push(Commander.create('CreateDataLink', createdNode.id, firstInput.inputName, pin.node.id, pin.name).processAndSave())
        }
      }
    }
  }
}