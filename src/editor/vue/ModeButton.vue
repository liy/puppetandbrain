<template>
<div @click='clicked' class='control-button tooltip-right' :class="{disabled: !this.enabled}" id='mode-button' data-title="Open puppet brain" data-title-position="right">
  <svg v-if="stageMode" width=100 height=100>
    <use :xlink:href="`#${BrainButtonIcon.id}`" :viewBox="BrainButtonIcon.viewBox"/>
  </svg>
  <svg v-else width=100 height=100>
    <use :xlink:href="`#${StageButtonIcon.id}`" :viewBox="StageButtonIcon.viewBox"/>
  </svg>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import BrainButtonIcon from '@/assets/brain-button-icon.svg';
import StageButtonIcon from '@/assets/stage-button-icon.svg';
import ActorSelection from '../objects/ActorSelection';

export default {
  name: 'mode-button',
  data() {
    return {
      BrainButtonIcon,
      StageButtonIcon,
      tooltip: 'Open puppet brain',
      enabled: false
    }
  },
  mounted() {
    // watch editor mode changes
    this.cancelWatch = this.$store.watch(() => this.$store.getters.stageMode, this.watcher);
    this.watcher(this.$store.getters.stageMode);
  },
  beforeDestroy() {
    this.cancelWatch();
  },
  computed: {
    ...mapGetters(['stageMode'])
  },
  methods: {
    ...mapMutations(['toggleStageMode']),
    watcher(stageMode) {
      if(stageMode) {
        this.tooltip = "Open puppet brain";

        console.log('test?')
        ActorSelection.on('actor.selection.change', this.onSelectChange, this);
        this.onSelectChange(ActorSelection.selected);
      }
      else {
        this.tooltip = "Back to stage";
    
        ActorSelection.off('actor.selection.change', this.onSelectChange, this);
        this.enabled = true;
      }
    },
    clicked() {
      this.$store.commit('toggleStageMode')
    },
    onSelectChange(selected) {
      console.log(selected);
      this.enabled = selected.length != 0;
    }
  }
}
</script>

<style lang="scss">
#mode-button {
  position: absolute;
  top: 20px;
  left: 20px;
}
#mode-button.disabled {
  opacity: 0.2;
  cursor: 'auto';
  pointer-events: 'none';
}
</style>
