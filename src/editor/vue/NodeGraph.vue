<template>
<div id='graph'>
  <div id='block-container' style="position:absolute; top:0; z-index:1;"></div>
  <svg id='graph-svg' style="position:absolute; top:0" ></svg>
</div>
</template>

<script>
import BrainGraph from '../graph/BrainGraph'

export default {
  name: 'node-graph',
  mounted() {
    // window.BrainGraph = new BrainGraph();
  },
  beforeDestroy() {
    BrainGraph.destroy();
  }
}
</script>

<style lang="scss">
#graph
{
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(119, 132, 154, 0.8);
  top:0;
  left:0;

  // https://stackoverflow.com/questions/14677490/blurry-text-after-using-css-transform-scale-in-chrome
  backface-visibility: hidden;
  // This stop text jittering!!!
  transform: translateZ(0);  
  // Make sure the font is scrip on transformations!
  -webkit-font-smoothing: subpixel-antialiased;
  
  display: none;

  // #MobileDevices specific:
  // This is important on mobile
  // It fixes the issue that the property panel shows up while panning 
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

#graph-svg {
  pointer-events: none;
}

// For testing purpose only do not add width and height for block-container!!!
// #block-container {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   background-color:rgb(255, 0, 0);
// }
</style>
