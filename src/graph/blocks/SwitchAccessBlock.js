import ListenerBlock from "./ListenerBlock";
require('./SwitchAccessBlock.scss')

export default class SwitchAccessBlock extends ListenerBlock
{
  constructor(node) {
    super(node);

    this.minWidth = 130;
  }
}