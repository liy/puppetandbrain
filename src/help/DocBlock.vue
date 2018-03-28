<template>
<div class="doc-box">
<div class="block doc-block" :class="pod.elementClass">
  <div class="title">{{pod.name}}</div>
  <div class="container">
    <div class="base">
      <div class="body" style="background-repeat: no-repeat; background-position: center center;" :style="`background-image: url(${this.backgroundImageUrl});`">
        <div class="content">

          <div class="left">

            <!-- enter execution -->
            <div class="execution-pin" v-if="pod.enter && pod.enter.enabled">
              <span class="label">{{pod.enter.name == 'default' ? '' : pod.enter.name}}</span>
              <div class="execution-symbol">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="43" height="22" class="undefined">
                  <use xlink:href="#execution-in" id="execution-in" viewBox="0 0 42.6 22"></use>  
                </svg>
              </div>
            </div>

            <!-- input -->
            <div class="data-pin" v-for="input in pod.inputs" :key="input.name">
              <span class="label">{{input.name}}</span>
              <div class="data-head">
                <div class="data-symbol">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="34" height="38" class="data-svg" style="pointer-events: none; --stroke:#b5a3ff;">
                    <use xlink:href="#input" id="input" viewBox="0 0 34 38"></use>
                  </svg>
                </div>
              </div>
            </div>

          </div>
          
          <div class="right">
            
            <!-- execution out -->
            <div class="execution-pin" v-for="exec in pod.execution" :key="exec.name">
              <span class="label">{{exec.name=='default' ? '' : exec.name}}</span>
              <div class="execution-symbol">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="43" height="22" class="undefined">
                  <use xlink:href="#execution-out" id="execution-out" viewBox="0 0 42.6 22"></use>
                </svg>
              </div>
            </div>

            <!-- output -->
            <div class="data-pin" v-for="output in pod.outputs" :key="output.name">
              <span class="label">{{output.name}}</span>
              <div class="data-head">
                <div class="data-symbol">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="34" height="38" class="data-svg" style="pointer-events: none; --fill:#98c6de;">
                    <use xlink:href="#output" id="output" viewBox="0 0 34 38"></use>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import '@/editor/graph/blocks/Block.scss'
import '@/editor/graph/blocks/AdaptorBlock.scss'
import '@/editor/graph/blocks/color-theme.scss'
import '@/editor/graph/support/BlockBody.scss'
import '@/editor/graph/support/DataPin.scss'
import '@/editor/graph/support/ExecutionPin.scss'

import ExecutionInIcon from '@/assets/execution-in.svg';
import ExecutionOutIcon from '@/assets/execution-out.svg';
import InputIcon from '@/assets/input.svg';
import OutputIcon from '@/assets/output.svg';

export default {
  name: 'doc-block',
  props: ['pod'],
  data() {
    return {
      backgroundImageUrl: this.pod.iconPath || require('!file-loader!@/assets/icons/dots.svg')
    }
  },
  mounted() {
    // console.log(this.pod)
  }
}
</script>

<style lang="scss" scoped>
.doc-box {
  height: 200px;
}
.doc-block {
  // position: relative;
  padding: 100px;
}
</style>
