<template>
<div>
  <div id='debug-trace'></div>
  <div id='activity-id' title="Copy activity link, and share it!"></div>
  <div id="editor">
    <div id="stage">
      <div id='stage-grid'></div>
      <canvas id='canvas'></canvas>
      <div id='stage-overlayer'></div>
    </div>

    <svg id='mask-container' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 768">
      <clipPath id="mask">
        <circle id="mask-circle" class='' cx="512" cy="384" r="1024">
        </circle>
      </clipPath>
    </svg>
  </div>
  <div id='graph'>
    <div id='block-container' style="position:absolute; top:0; z-index:1;"></div>
    <svg id='graph-svg' style="position:absolute; top:0" ></svg>
  </div>
  <div class='control-button tooltip-right' id='mode-button' data-title="Open puppet brain" data-title-position="right"></div>
  <div id='control-panel'>
    <div class='control-button' id='bin-button' data-title="Delete puppet"></div>
    <div class='control-button' id='debug-button' data-title="Play game"></div>
    <div class='control-button' id='add-actor-button' data-title="Add puppet"></div>
  </div>
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
import NotificationControl from './ui/NotificationControl';

var once = false;

export default {
  name: 'Editor',
  async mounted() {
    if(!once) {
      console.log(once)
      await import('pixi.js')
      await import('@/API')
      await import('./index')
      once = true;
    }

    UIController.stageMode();
    UIController.addBtn.enabled = true;
    

    let tutorialName = this.$route.params.tutorialName;
    if(tutorialName) {
      const tutorial = (await import(`@/tutorials/${tutorialName}`)).default;
      tutorial.start();
    }
  },
  beforeDestroy() {
    // clear everything...
    Activity.clear();
    History.destroy();
    NotificationControl.destroy();
  }
}
</script>

<style lang="scss" scoped>
#editor {
  // disable text selection.(Input will override it)
  user-select: none;

  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center; 
}

#stage {
  position: relative;
  border-radius: 10px;
  // background-color: #F7F7F7;
  background-color: #f0f0f0;
}

#stage-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
}

#stage-overlayer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  
  // Prevent user drag select div elements
  user-select: none;
  // overlay must not block mouse event, so PIXI.js canvas can still receive the event
  pointer-events: none;
  * {
    // only allow select text in children
    user-select: text;
    // only children of the overlay can accept mouse event
    pointer-events: all;
  }
}

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

#debug-trace {
  font-size: 16px;
  position: absolute;
  top: 10px;
  left: 10px;
  user-select: none;
  pointer-events: none;
  color: rgb(255, 109, 236);
  width: 300px;
  height: 300px;

  overflow: hidden;
  z-index: 2;
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
