<template>

<div id='theater'>
  <div id="stage">
    <div id='stage-underlayer' :style="{width, height, backgroundColor}"></div>
    <canvas id='canvas' :width="width" :height="height"></canvas>
    <div id='stage-overlayer' :style="{width, height}"></div>
  </div>

  <svg id="mask-container" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox">
    <clipPath id="mask">
      <circle id="mask-circle" :cx="cx" :cy="cy" :r="r">
      </circle>
    </clipPath>
  </svg>
</div>
</template>

<script>
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
    backgroundColor: {
      type: [Number, String],
      default: '#f0f0f0'
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    cx() {
      return this.width/2
    }, 
    cy() {
      return this.height/2
    },
    r() {
      return this.width;
    }
  }
}
</script>

<style lang="scss">
#theater {
  position: relative;

  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center; 
}

#stage {
  position: relative;
}

#stage-underlayer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  border-radius: 10px;
}

canvas {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

#stage-overlayer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  
  // overlay must not block mouse event, so PIXI.js canvas can still receive the event
  pointer-events: none;
  
  // Prevent user drag select div elements
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  * {
    // only allow select text in children
    -moz-user-select: text;
    -webkit-user-select: text;
    user-select: text;
    // only children of the overlay can accept mouse event
    pointer-events: all;
  }
}

#mask-container {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height:100%;

  pointer-events: none;
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
  animation-duration: 1.0s;
  animation-fill-mode: forwards;
  animation-name: circle-close;
  animation-timing-function: cubic-bezier();
  transform-origin: center center;
}

.circle-mask-open {
  animation-duration: 1.0s;
  animation-name: circle-open;
  transform-origin: center center;
}

#stage.masking {
  -webkit-clip-path: url(#mask);
  clip-path: url(#mask);
  
  // disable events on stage while mask is in transition mode
  pointer-events: none;
}
</style>
