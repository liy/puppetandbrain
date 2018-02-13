const filters = require('pixi-filters');
import './ChoiceBox.scss';
import Actor from "./Actor";
import BoxComponent from "../components/BoxComponent";
import GraphicsComponent from "../components/GraphicsComponent";
import DataType from '../data/DataType';
import IconStore from '../ui/IconStore';
import html2canvas from 'html2canvas';
import ImageLoader from '../resources/ImageLoader';

export default class ChoiceBox extends Actor
{
  constructor(id) {
    super(id);
    
    this.selectOutline = new filters.OutlineFilter(4, 0xc95ce8)
    this.hoverOutline = new filters.OutlineFilter(3, 0xdbace8)
  }

  init(pod={}) {
    super.init(pod);

    this.width = pod.width || 200;
    this.height = pod.height || 200;
    this.padding = pod.padding || 0;

    let boxWidth = this.width-this.padding*2;
    let boxHeight = this.height-this.padding*2;

    this.content = this.addComponent('content', new BoxComponent(boxWidth, boxHeight));
    this.content.on('input', this.onInput, this);
    this.box = this.addComponent('box', new GraphicsComponent());


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
      data: pod.properties.boxColor || 0xFFFFFF,
      propertyName: 'boxColor',
      descriptor: {
        friendlyName: 'box color',
        gadgetClassName: 'ColorButton',
        type: DataType.COLOR,
        iconID: IconStore.COLOR
      }
    })
    this.properties.add({
      data: pod.properties.textColor || 0x000000,
      propertyName: 'textColor',
      descriptor: {
        friendlyName: 'text color',
        gadgetClassName: 'ColorButton',
        type: DataType.COLOR,
        iconID: IconStore.COLOR
      }
    });
    this.properties.add({
      data: pod.properties.image || {},
      propertyName: 'image',
      descriptor: {
        type: DataType.IMAGE,
        iconID: "🖼️"
      }
    });
  }

  onInput(text) {
    this.properties.get('text').data = text;
  }

  hitTest(x, y) {
    return this.box.graphics.containsPoint(new PIXI.Point(x,y));
  }

  select() {
    super.select();

    this.box.graphics.filters = [this.selectOutline]
    // bring it to front
    Editor.stage.addChild(this.box.container);
  }

  deselect() {
    super.deselect();
    this.box.graphics.filters = [];
  }

  mouseOver(e) {
    if(!this.selected) {
      this.box.graphics.filters = [this.hoverOutline]
    }
  }

  mouseOut(e) {
    if(!this.selected) {
      this.box.graphics.filters = []
    }
    else {
      this.box.graphics.filters = [this.selectOutline]
    }
  }

  set boxColor(c) {
    this.box.graphics.beginFill(c, 1);
    this.box.graphics.drawRoundedRect (-this.width/2, -this.height/2, this.width, this.width, 10);
    this.box.graphics.endFill();
  }

  get boxColor() {
    return this.properties.get('boxColor').data;
  }

  set textColor(c) {
    this.content.textColor = c;
  }

  get textColor() {
    return this.properties.get('textColor').data;
  }

  set image(fileData) {
    ImageLoader.fetch(fileData).then(({image, blob, url}) => {
      this.content.imageUrl = image.src;
      // this.content.imageUrl =  URL.createObjectURL(blob)
      // this.content.imageUrl = url;


      // let read = new FileReader();
      // read.onload = e => {
      //   this.content.imageUrl = e.target.result;
      // }
      // read.readAsDataURL(blob);




      // let test = new Image();
      // test.crossOrigin = 'Anonymous'
      // test.src = url;
      // this.content.setImage(test);
    }).catch(e => {
      this.content.imageUrl = require('!file-loader!../assets/icons/dots.svg');
    })

    // function getDataUri(url, callback) {
    //   var image = new Image();
    //   image.crossOrigin = 'Anonymous'
  
    //   image.onload = function () {
    //       var canvas = document.createElement('canvas');
    //       canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    //       canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
  
    //       canvas.getContext('2d').drawImage(this, 0, 0);
  
    //       // Get raw image data
    //       //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
  
    //       // ... or get as Data URI
    //       callback(canvas.toDataURL('image/png'));
    //   };
  
    //   image.src = url;
    // }
    // getDataUri('https://firebasestorage.googleapis.com/v0/b/puppet-brain-staging.appspot.com/o/uploads%2F61ff88c53b2d9883998a099a9f861c386ce0efc6.png?alt=media&token=9a09439c-2d35-4c0c-b2d8-3972cd4e2735', (data) => {
    //   this.content.imageUrl = data;
    // })
    // fetch('https://firebasestorage.googleapis.com/v0/b/puppet-brain-staging.appspot.com/o/uploads%2F61ff88c53b2d9883998a099a9f861c386ce0efc6.png?alt=media&token=9a09439c-2d35-4c0c-b2d8-3972cd4e2735',{
    //   // mode: 'cors',
    // })
    //   .then(response => {
    //     console.log(response.type)
    //     if(response.ok) {
    //       response.blob().then(blob => {
    //         // this.content.imageUrl = URL.createObjectURL(blob);
    //         let read = new FileReader();
    //         read.onload = e => {
    //           this.content.imageUrl = e.target.result;
    //         }
    //         read.readAsDataURL(blob);
    //       })
    //     }
    //   })
  }

  get image() {
    // return this.content.imageUrl
    return this.properties.get('image').data
  }

  set text(text) {
    this.content.text = text;
  }

  get text() {
    return this.properties.get('text').data;
  }

  async snapshot() {
    let fileData = this.properties.get('image').data;

    let texture = Editor.renderer.generateTexture(this.box.container);
    let canvas = Editor.renderer.extract.canvas(texture);
    // TODO: to be removed
    canvas.id = 'snapshot-canvas';

    // draw dom element to canvas
    return html2canvas(this.content.element, {
      backgroundColor: null,
      // Load the cross domain images!!!
      // As all the authoring time data will be uploaded to the server,
      // there will be no issue to access cors image.
      allowTaint: true,
    }).then(domCanvas => {
      canvas.getContext('2d').drawImage(domCanvas, 0, 0);
      return canvas;
    })
  }
} 