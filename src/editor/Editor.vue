<template>
<div>
  <terminal/>
  <theater ref='theater' width=1024 height=768></theater>
  <node-graph/>
  <toolbox/>
  <mode-button/>
  <guide-menu/>
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
import GuideMenu from './vue/GuideMenu.vue';

import './Hub'
import NotificationControl from './ui/NotificationControl';
import ConfirmModal from './ui/ConfirmModal';

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
    'mode-button': ModeButton,
    'guide-menu': GuideMenu,
  },
  mounted() {
    // beforeRouteLeave will wait until Hub is installed to start process
    // unlike mounted which only call once(I do not update Editor component)
    // beforeRouteLeave will be triggered mulitple times when route changes
    // inbetween /editor and /editoir/xxxx
    this.installed = new Promise(async resolve => {
      // prevent default context menu for the whole site
      // unless it is from canvas, which pixi needs it to handle right click.
      document.addEventListener('contextmenu', this.preventDefaultContextMene);

      // wait until everything is setup, ie, user is signed in
      await Hub.install(this.$router);

      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if(mutation.type === 'toggleDebugMode') {
          if(state.debugMode) {
            Hub.stage.start();
          }
          else {
            Hub.stage.stop();
          }
        }
      });

      document.addEventListener('keydown', this.keydown)

      resolve();
    })
  },
  beforeDestroy() {
    this.unsubscribe();
    
    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('contextmenu', this.preventDefaultContextMene);
    
    Hub.uninstall();
  },
  async beforeRouteLeave(to, from, next) {  
    // Save and clone action does not triggers clear process
    if(to.params.activityID == Hub.activity.id) {
      next();
    }
    else {
      // check whether there is unsaved change
      if(!Hub.saved) {
        const {action} = await ConfirmModal.open('Do you really want to leave? you have unsaved changes!', 'Unsaved changes')
        // user choose abort navigation
        if(!action) {
          next(false);
          return;
        }
      }

      // normal route process
      // navigate to a new activity
      // firstly, cancel loading if any.
      Hub.cancelLoading();
      // clear current activity data
      Hub.clear();
      // then go to next activity
      next();
    }
  },
  beforeRouteEnter(to, from, next) {
    // after hub is installed correctly
    next(async vm => {
      // wait until hub is installed correctly
      await vm.installed;

      const activityID = to.params.activityID;
      // navigate to a specific activity
      if(activityID) {
        // clone and save does not need to reload the activity
        if(!Hub.activity || activityID != Hub.activity.id) {
          const chip = NotificationControl.notify('Loading...')
          await Hub.load(activityID);
          chip.fadeOut();
        }
      }
      // no activityID provide, create a temp activity
      else {
        await Hub.create();
      }
    })
  },
  methods: {
    keydown(e) {
      if(e.keyCode == 83 && e.ctrlKey) {
        e.preventDefault();

        if(Hub.activity.isOwner) {
          NotificationControl.notify('Saving...').delayFadeoutRemove();
          Hub.save().then(activity => {
            this.$router.push(`/editor/${activity.id}`)
          })
        }
        else {
          NotificationControl.notify('Clone...').delayFadeoutRemove();
          Hub.clone().then(activity => {
            this.$router.push(`/editor/${activity.id}`)
          })
        }
      }
    },
    preventDefaultContextMene(e) {
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss">

.blur {
  filter: blur(3px);
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
