import Actor from "./Actor";
import TextComponent from "../components/TextComponent";
import GraphicsComponent from "../components/GraphicsComponent";

export default class ChoiceBox extends Actor
{
  constructor() {
    super();
  }

  init(pod) {
    super.init(pod);

    this.addComponent('label', new TextComponent());
    this.graphics = this.addComponent('box', new GraphicsComponent()).graphics;

    this.graphics.beginFill(0xFF9900, 1);
    this.graphics.drawRect(0, 0, 100, 100);
    this.graphics.endFill();
  }
} 