import KeyDown from "./KeyDown";

export default class SwitchDown extends KeyDown
{
  constructor(id) {
    super(id);

    this.inputs.remove('key')
    this.outputs.addOutput('which')
  }

  keydown(e) {
    switch(e.keyCode) {
      case 32:
      case 49:
      case 9:
        this.outputs.assignValue('which', 'left');
        super.run();
        this.execution.run();
        break

      case 13:
      case 51:
        this.outputs.assignValue('which', 'right');
        super.run();
        this.execution.run();
        break
    }
  }
}