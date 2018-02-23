import './ui/Tooltip.scss'

import html2canvas from 'html2canvas';
import 'pixi-spine';
import './NodeTemplate';
// LookUp is a global window variable, save typing!
import './LookUp'
import './nodes/NodeFactory'
import './objects/ActorFactory'
import './graph/BlockFactory'
import './commands/History'
import './commands/Commander'
import './graph/BrainGraph'
import './Editor'
import './ui/UIController';

import './resources/Resource';
import './Activity';

import ActorSelection from './objects/ActorSelection';
import notc from './ui/NotificationControl';


window.ActorSelection = ActorSelection;