<template>
<div>
  <terminal/>
  <theater ref='theater' width=1024 height=768></theater>
  <node-graph/>

  <toolbox/>
  <mode-button/>

  <div class='control-button tooltip-right' id='mode-button' data-title="Open puppet brain" data-title-position="right"></div>
  <span id='app-version'></span>
  <div id='menu'>
    <div id='menu-content' style="visibility: hidden;">
      <div class='menu-arrow'></div>
      <ul>
        <router-link to='/' tag='li'><a>Home</a></router-link>
        <router-link to='/tutorials/animate-a-puppet' tag='li'><a>Tutorials</a></router-link>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import 'pixi.js'
import 'pixi-spine';

import '@/API'

import Terminal from './vue/Terminal.vue'; 
import NodeGraph from './vue/NodeGraph.vue';
import Theater from './vue/Theater.vue';
import Toolbox from './vue/Toolbox.vue';
import ModeButton from './vue/ModeButton.vue';

import './ActivityManager'
import NotificationControl from './ui/NotificationControl';

export default {
  name: 'editor',
  props: ['activityID'],
  data() {
    return {
      activity: null
    }
  },
  components: {
    terminal: Terminal,
    'node-graph': NodeGraph,
    theater: Theater,
    toolbox: Toolbox,
    'mode-button': ModeButton
  },
  async mounted() {
    // prevent default context menu for the whole site
    // unless it is from canvas, which pixi needs it to handle right click.
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
    });

    // wait until user is signed in
    await ActivityManager.setup(this.activityID);
    this.$store.commit('staging', this.activity);

    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'toggleDebugMode') {
        if(state.debugMode) {
          ActivityManager.stage.start();
        }
        else {
          ActivityManager.stage.stop();
        }
      }
    });

    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    console.log('desotry!')
    // clear everything...
    AcivityManager.activity.destroy();

    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    keydown(e) {
      if(e.keyCode == 83 && e.ctrlKey) {
        e.preventDefault();

        NotificationControl.notify('Saving...').delayFadeoutRemove();

        ActivityManager.save().then(activity => {
          this.$router.push(`/editor/${activity.id}`)
        })
      }
    }
  }
}
</script>

<style lang="scss">
#app-version {
  position: absolute;
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10px;
  color: rgb(175, 175, 175);
  bottom: 3px;
  left: 3px;
  
  user-select: none;
  pointer-events: none;
}

.blur {
  filter: blur(3px);
}

#undo-button {
  position: absolute;
  user-select: none;
  cursor: pointer;
  z-index: 2;
  bottom: 20px;
  left: 20px;
  width: 100px;
  height: 100px;

  background-repeat: no-repeat;
  background-position: center; 
}

#redo-button {
  position: absolute;
  user-select: none;
  cursor: pointer;
  z-index: 2;
  bottom: 20px;
  left: 120px;
  width: 100px;
  height: 100px;


  background-image: url('../assets/redo-arrow.svg');
  background-repeat: no-repeat;
  background-position: center; 
}

#at {
  position: absolute;
  user-select: none;
  pointer-events: none;
  // cursor: pointer;
  z-index: 1;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;

  background-image: url('../assets/at.svg');
  background-repeat: no-repeat;
  background-position: center; 
}

// disable drag DOM element selection!!! 
span {
  user-select: none;
}
svg {
  user-select: none;
}
div {
  user-select: none;
}

// #MobileDevices specific:
// fixing the mobile browser bounce issue
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}



@keyframes circle-close {
  to {
    transform: scale(0);
  }
  from {
    transform: scale(1);
  }
}

@keyframes circle-open {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.circle-mask-close {
  animation-duration: 1.5s;
  // animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-name: circle-close;
  animation-timing-function: cubic-bezier();
  transform-origin: center center;
}

.circle-mask-open {
  animation-duration: 1.5s;
  // animation-iteration-count: infinite;
  animation-name: circle-open;
  transform-origin: center center;
}

#stage.masking {
  -webkit-clip-path: url(#mask);
  clip-path: url(#mask);
}

#mask-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  pointer-events: none;
}
</style>
