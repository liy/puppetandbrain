<template>
<div id="editor">
  <terminal/>
  <theater ref='theater' width=1024 height=768></theater>
  <!-- <actor-list/> -->
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
import ActorList from './vue/ActorList.vue';

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
    'actor-list': ActorList,
  },
  async mounted() {
    // beforeRouteLeave will wait until Hub is installed to start process
    // unlike mounted which only call once(I do not update Editor component)
    // beforeRouteLeave will be triggered mulitple times when route changes
    // inbetween /editor and /editoir/xxxx
    
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

    // prevent default context menu for the whole site
    // unless it is from canvas, which pixi needs it to handle right click.
    document.addEventListener('contextmenu', this.preventDefaultContextMene);
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    this.unsubscribe();
    
    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('contextmenu', this.preventDefaultContextMene);
    
    Hub.uninstall();
  },
  // when user navigate under /editor/, 
  // route activity ID parameter changes
  async beforeRouteUpdate(to, from, next) {
    await this.clearHub(to, from, next);

    // Hub should already be installed, no need to wait

    const activityID = to.params.activityID;
    const chip = NotificationControl.notify('Loading...')

    Hub.lock();
    await Hub.load(activityID);
    this.autoPlay();
    Hub.unlock();

    chip.fadeOut();
  },
  async beforeRouteLeave(to, from, next) {  
    this.clearHub(to, from, next)
  },
  // navigated from external site
  beforeRouteEnter(to, from, next) {
    console.log('before enter')
    // after hub is installed correctly
    next(async vm => {
      // wait until hub is installed correctly
      await Hub.installed;

      const activityID = to.params.activityID;
      // navigate to a specific activity
      if(activityID) {
        // clone and save does not need to reload the activity
        if(!Hub.activity || activityID != Hub.activity.id) {
          const chip = NotificationControl.notify('Loading...')

          Hub.lock();
          await Hub.load(activityID);
          vm.autoPlay();
          Hub.unlock();

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
    autoPlay() {
      // auto play if user is not the owner of the activity
      if(!Hub.activity.isOwner) {
        this.$store.commit('updateDebugMode', true);
        Hub.stage.start();
      }
    },
    async clearHub(to, from, next) {
      // Save and clone action does not triggers clear process
      if(to.params.activityID == Hub.activity.id) {
        next();
      }
      else {
        // check whether there is unsaved change
        if(Hub.activity.dirty) {
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
    keydown(e) {
      if(e.keyCode == 83 && e.ctrlKey) {
        e.preventDefault();

        if(Hub.locked) return;

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
</style>
