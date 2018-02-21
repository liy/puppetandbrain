import './MapElement.scss'
import VariableElement from './VariableElement';
import MapEntry from './MapEntry';
import MapIcon from '@/assets/dictionary-icon.svg';
import AddIcon from '@/assets/plus.svg'
import { svgElement, nextFrame } from '@/utils/utils';
import ArrayMap from '@/utils/ArrayMap';
import TimeToken from '@/utils/TimeToken';

let tokenGenerator = new TimeToken(4, 1, [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);

export default class extends VariableElement
{
  constructor(variable) {
    super(variable, svgElement(MapIcon,{width:16, height:16}));

    // store the list entry element
    this.entries = new ArrayMap()

    // only show up when selected
    this.addButton = document.createElement('div');
    this.addButton.appendChild(svgElement(AddIcon, {width:12, height:12}))
    this.content.appendChild(this.addButton);
    this.addButton.className = 'add-entry-icon';
    this.addButton.style.visibility = 'hidden';

    this.listElement = document.createElement('ol');
    this.listElement.setAttribute('placeholder', 'Empty... 😭') 
    this.listElement.className = 'list map'
    this.element.appendChild(this.listElement);

    this.addButton.addEventListener('mousedown', e => {
      e.preventDefault();
      this.add();
    });

    // // initialize the list
    // for(let key of this.data.keys) {
    //   this.add(key, this.data.get(key));
    // }

    // initialize the map
    let keys = Object.keys(this.variable.data);
    for(let key of keys) {
      let value = this.variable.data[key];
      let entry = new MapEntry(this.variable.data, key, value);
      this.listElement.appendChild(entry.element);
      this.entries.set(key, entry);
      entry.on('entry.remove', this.remove, this)
    }
  }

  destroy() {
    for(let entry of this.entries) {
      entry.destroy();
    }
    super.destroy();
  }

  add(key=`${tokenGenerator.gen()}`, value=null) {
    let entry = new MapEntry(this.variable.data, key, value);
    this.listElement.appendChild(entry.element);

    this.variable.data[key] = value;
    this.entries.set(key, entry);

    // wait until next frame to focus
    nextFrame().then(() => {
      entry.focus();
    })

    entry.on('entry.remove', this.remove, this)
  }

  remove(entry) {
    delete this.variable.data[entry.key];
    this.entries.remove(entry.key);
    this.listElement.removeChild(entry.element);
  }

  get(key) {
    return this.entries.get(key);
  }

  select() {
    super.select();
    this.listElement.style.display = 'block';
    this.addButton.style.visibility = 'visible';
  }

  deselect() {
    super.deselect();
    this.listElement.style.display = 'none';
    this.addButton.style.visibility = 'hidden';
  }
}