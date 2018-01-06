import Block from "./Block";
import AddOutputPin from '../support/AddOutputPin'
import AInputPin from "../support/AInputPin";

export default class ActionBlock extends Block
{
  constructor() {
    super();

    this.body.width = 120;
    this.body.minHeight = 120;
  }
  
  init(node) {
    super.init(node);

    this.body.addLeft(new AInputPin('ABCD ABCDABCDABCD'));

    this.body.addRight(new AddOutputPin());
  }
}