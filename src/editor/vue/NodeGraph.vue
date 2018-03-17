<template>
<div ref='container' id='graph'>
  <div class='graph-name-container'>
    <div class='graph-name' :class="{hidden: hidden}"></div>
  </div>
  <div id='block-container' style="position:absolute; top:0; z-index:1;"></div>
  <svg id='graph-svg' style="position:absolute; top:0" ></svg>
</div>
</template>

<script>
import BrainGraphClass from '../graph/BrainGraph'
import {mapGetters} from 'vuex'
import {isMobile} from '@/utils/utils'

export default {
  name: 'node-graph',
  computed: {
    ...mapGetters(['propertyPanelVisable']),
    hidden() {
      return isMobile && this.propertyPanelVisable
    }
  },
  mounted() {
    window.BrainGraph = new BrainGraphClass(this.$refs.container);
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

.graph-name-container {
  position: relative;
  z-index: 6;
  
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
  user-select: none;
}

.graph-name {
  text-align: center;
  color: white;
  min-width: 40px;

  font-size: 16px;

  border-radius: 20px;
  background-color: #77849a;

  padding: 5px 20px;

  opacity: 1;
  transition: opacity 0.3s ease;
}

.graph-name.hidden {
  opacity: 0;
}

// For testing purpose only do not add width and height for block-container!!!
// #block-container {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   background-color:rgb(255, 0, 0);
// }
</style>
