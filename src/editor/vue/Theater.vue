<template>

<div id='theater'>
  <div ref='stage' id="stage">
    <div id='stage-grid'></div>
    <canvas id='canvas' :width="width" :height="height"></canvas>
    <div id='stage-overlayer'></div>
  </div>

  <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 width height">
    <clipPath id="mask">
      <circle id="mask-circle" class='' cx="width/2" cy="height/2" r="width">
      </circle>
    </clipPath>
  </svg> -->
</div>
</template>

<script>
import StageClass from '../Stage';

export default {
  name: 'theater',
  props: {
    width: {
      type: [Number, String],
      default: 400,
    },
    height: {
      type: [Number, String],
      default: 300
    },
  },
  mounted() {
    window.Stage = new StageClass(this.$refs.stage);
  }
}
</script>

<style lang="scss">
#theater {
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
</style>
