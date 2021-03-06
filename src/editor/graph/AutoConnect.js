import SoundEffect from '@/SoundEffect';

export default 
{
  process(pin, createdNode) {
    let inNode = pin.node;
    
    // If dragging from execution pin and target node has execution pin
    // connect execution pin
    if(pin.type == 'execution' && createdNode.execution) {
      let executionName = pin.name;
      let sourceNode = pin.node;
      let targetNode = createdNode;
      if(pin.flow == 'in') {
        executionName = createdNode.execution.contains('default') ? 'default' : createdNode.execution.keys[0];
        sourceNode = createdNode;
        targetNode = pin.node;
      }
      // target node has no execution in, do not connect
      else if(!targetNode.enter.enabled){
        return;
      }

      SoundEffect.play('link')
      Hub.history.push(Commander.create('CreateExecution', sourceNode.id, executionName, targetNode.id).processAndSave());
    }
    // If dragging from data pin, connect data pin only
    else if(pin.type == 'data'){
      // connect to first ouput if any
      if(pin.flow == 'in') {
        let firstOutput = createdNode.outputs.get(createdNode.outputs.names[0]);
        if(firstOutput) {
          SoundEffect.play('link')
          Hub.history.push(Commander.create('CreateDataLink', pin.node.id, pin.name, createdNode.id, firstOutput.name).processAndSave())
        }
      }
      else {
        let firstInput = createdNode.inputs.get(createdNode.inputs.names[0]);
        if(firstInput) {
          SoundEffect.play('link')
          Hub.history.push(Commander.create('CreateDataLink', createdNode.id, firstInput.name, pin.node.id, pin.name).processAndSave())
        }
      }
    }
  }
}