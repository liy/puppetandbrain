import './ChoiceBox.scss';
import Actor from "./Actor";
import BoxComponent from "../components/BoxComponent";
import GraphicsComponent from "../components/GraphicsComponent";

export default class ChoiceBox extends Actor
{
  constructor() {
    super();
  }

  init(pod={}) {
    super.init(pod);

    this.width = pod.width || 200;
    this.height = pod.height || 200;
    this.padding = pod.padding || 0;

    let boxWidth = this.width-this.padding*2;
    let boxHeight = this.height-this.padding*2;

    this.content = this.addComponent('content', new BoxComponent(boxWidth, boxHeight));
    this.content.position.x = -boxWidth/2;
    this.content.position.y = -boxHeight/2;

    this.box = this.addComponent('box', new GraphicsComponent());
    this.color = 0xFFFFFF;
  }

  select() {
    super.select();

    // bring it to front
    Editor.stage.addChild(this.box.container);
  }

  set color(c) {
    this._color = c;
    this.box.graphics.beginFill(this.color, 1);
    this.box.graphics.drawRoundedRect (-this.width/2, -this.height/2, this.width, this.width, 10);
    this.box.graphics.endFill();
  }

  get color() {
    return this._color;
  }
} 