import './TextWidget.scss';
import Actor from "./Actor";
import DataType from '../data/DataType';
import IconStore from '../ui/IconStore';
import html2canvas from 'html2canvas';
import Vec2 from '../math/Vec2';
import Matrix from '../math/Matrix';
import { aroundAt } from '@/utils/utils';
import TextComponent from '../components/TextComponent';

export default class TextWidget extends Actor
{
  constructor(id, activity, pod) {
    super(id, activity, pod);
  }

  init(pod={}) {
    super.init(pod);

    this.content = this.addComponent('content', new TextComponent(''));
    this.content.on('input', this.onInput, this);

    // just make code a little bit easier to read by define a properties field
    // if it does not exist
    pod.properties = pod.properties || {};
    // setup properties
    this.properties.add({
      data: pod.properties.text || '',
      propertyName: 'text',
      descriptor: {
        iconID: '🏷️',
        type: DataType.STRING
      }
    })
    this.properties.add({
      data: pod.properties.textColor || 0x000000,
      propertyName: 'textColor',
      descriptor: {
        friendlyName: 'text color',
        type: DataType.COLOR,
        iconID: IconStore.COLOR
      }
    });
    this.properties.add({
      data: pod.properties.fontSize || 18,
      propertyName: 'fontSize',
      descriptor: {
        friendlyName: 'font size',
        type: DataType.INTEGER,
        data: {
          value: pod.properties.fontSize || 18,
          min: 1,
          max: 60,
          decimalPlaces: 0,
        },
        gadgetClassName: 'RangeField',
        iconID: IconStore.GENERIC
      }
    });

    this.emit('actor.ready', this);
  }

  onInput(text) {
    console.log(text)
    this.properties.get('text').data = text;
  }

  hitTest(x, y) {

  }

  select() {
    super.select();

  }

  mouseOver(e) {
    if(!this.selected) {

    }
  }

  mouseOut(e) {

  }

  set textColor(c) {
    this.content.textColor = c;
  }

  get textColor() {
    return this.properties.get('textColor').data;
  }

  set text(text) {
    this.content.text = text;
  }

  get text() {
    return this.properties.get('text').data;
  }

  set fontSize(size) {
    this.content.fontSize = size;
  }

  get fontSize() {
    return this.content.fontSize;
  }

  async snapshot() {
    return html2canvas(this.content.element, {
      backgroundColor: null,
      // width: 200/this.scale.x,
      // height: 200/this.scale.y,
      // Load the cross domain images!!!
      // As all the authoring time data will be uploaded to the server,
      // there will be no issue to access cors image.
      allowTaint: true,
    })
  }
} 