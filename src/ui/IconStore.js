import PositionIcon from '../assets/position-icon.svg';
import SizeIcon from '../assets/size-icon.svg';
import RotationIcon from '../assets/rotation-icon.svg';
import BucketIcon from '../assets/paint-bucket.svg';
import ListIcon from '../assets/list-icon.svg';
import DictionaryIcon from '../assets/dictionary-icon.svg';
import DotIcon from '../assets/dot.svg';
import { svgElement } from '../utils/utils';

const NAMES = {
  GENERIC: 'generic',
  VEC2: 'position',
  SIZE: 'size',
  ROTATION: 'rotation',
  COLOR: 'color',
  ACTOR: 'actor',
  LIST: 'list',
  DICTIONARY: 'dictionary'
}

const STORE = {
  [NAMES.VEC2]: {
    icon: PositionIcon,
    width: 10,
    height: 16
  },
  [NAMES.SIZE]: {
    icon: SizeIcon,
    width: 18,
    height: 18,
  },
  [NAMES.ROTATION]: {
    icon: RotationIcon,
    width: 18,
    height: 18,
  },
  [NAMES.COLOR]: {
    icon: BucketIcon,
    width: 18,
    height: 18,
  },
  [NAMES.ACTOR]: '🐶',
  [NAMES.LIST]: {
    icon: ListIcon,
    width: 17,
    height: 14,
  },
  [NAMES.DICTIONARY]: {
    icon: DictionaryIcon,
    width: 16,
    height: 16
  },
  [NAMES.GENERIC]: {
    icon: DotIcon,
    width: 10,
    height: 10
  },
}

export default {
  ...NAMES,
  get(name=NAMES.GENERIC) {
    if(!STORE[name]) return name;
    return svgElement(STORE[name].icon, {width: STORE[name].width, height: STORE[name].height});
  }
}