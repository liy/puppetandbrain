<template>
<div @touchmove.prevent @click='clicked' class='control-button tooltip-right' :class="{disabled: !this.enabled || this.modeLock}" :data-title="tooltip" id='mode-button' data-title-position="right">
  <svg v-if="stageMode">
    <use :xlink:href="`#${BrainButtonIcon.id}`" :viewBox="BrainButtonIcon.viewBox"/>
  </svg>
  <svg v-else>
    <use :xlink:href="`#${StageButtonIcon.id}`" :viewBox="StageButtonIcon.viewBox"/>
  </svg>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import BrainButtonIcon from '@/assets/brain-button-icon.svg';
import StageButtonIcon from '@/assets/stage-button-icon.svg';
import ActorSelection from '../objects/ActorSelection';
import SoundEffect from '@/SoundEffect';

export default {
  name: 'mode-button',
  data() {
    return {
      BrainButtonIcon,
      StageButtonIcon,
      enabled: false
    }
  },
  computed: {
    ...mapGetters(['stageMode', 'modeLock']),
    tooltip() {
      return this.stageMode ? 'Open puppet brain' : 'Back to stage'
    }
  },
  mounted() {
    // watch editor mode changes
    this.watcher(this.stageMode);
  },
  beforeDestroy() {
    ActorSelection.off('actor.selection.change', this.onSelectChange, this);
  },
  watch: {
    stageMode: {
      handler: function(nv, ov) {
        this.watcher(nv)
      }  
    }
  },
  methods: {
    ...mapMutations(['toggleStageMode']),
    watcher(stageMode) {
      if(stageMode) {
        ActorSelection.on('actor.selection.change', this.onSelectChange, this);
        this.onSelectChange(ActorSelection.selected);
      }
      else {
        ActorSelection.off('actor.selection.change', this.onSelectChange, this);
        this.enabled = true;
      }
    },
    clicked() {
      if(!this.enabled) return;
      SoundEffect.play('click');

      if(this.stageMode) {
        let brain = ActorSelection.selected[0].brain;
        Hub.history.push(Commander.create('OpenGraph', brain.id).process());
      }
      else {
        Hub.history.push(Commander.create('CloseGraph', BrainGraph.brain.id).process());
      }
    },
    onSelectChange(selected) {
      this.enabled = selected.length != 0;
    }
  }
}
</script>

<style lang="scss">
#mode-button {
  svg {
    width: 100px;
    height: 100px;
  }
  position: absolute;
  top: 20px;
  left: 20px;
  
  cursor: pointer;
}
#mode-button.disabled {
  opacity: 0.2;
  cursor: auto;
  pointer-events: none;
}

@media screen and (max-width: 600px), screen and (max-height: 500px) {
  #mode-button {
    left: 10px;
    top: 28px;
    svg {
      width: 64px;
      height: 64px;
    }
  }
}
</style>
