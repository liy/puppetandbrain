<template>
<div class='toolbar-button' :class="{disabled: !this.enabled}" id='delete-button' data-title="Delete puppet" @click="clicked">
  <svg width=68 height=68>
    <use :xlink:href="`#${BinButtonIcon.id}`" :viewBox="BinButtonIcon.viewBox"/>
  </svg>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import BinButtonIcon from '@/assets/bin-button-icon.svg';
import GraphSelection from '../graph/GraphSelection';
import ActorSelection from '../objects/ActorSelection';

export default {
  data() {
    return {
      BinButtonIcon,
      enabled: false
    }
  },
  mounted() {
    document.addEventListener('keydown', this.keydown);

    // watch editor mode changes
    this.cancelWatch = this.$store.watch(() => this.$store.getters.stageMode, stageMode => {
      if(stageMode) {
        GraphSelection.off('block.selection.change', this.onSelectChange, this)
        ActorSelection.on('actor.selection.change', this.onSelectChange, this);
        this.onSelectChange(ActorSelection.selected);
      }
      else {
        ActorSelection.off('actor.selection.change', this.onSelectChange, this);
        GraphSelection.on('block.selection.change', this.onSelectChange, this);
        this.onSelectChange(GraphSelection.selected);
      }
    })
  },
  beforeDestroy() {
    this.cancelWatch();
    document.removeEventListener('keydown', this.keydown);
  },
  computed: {
    ...mapGetters(['stageMode'])
  },
  methods: {
    clicked() {
      if(this.stageMode) {
        ActorSelection.delete();
      }
      else {
        GraphSelection.delete();
      }
    },
    keydown(e) {
      if(!this.enabled) return;

      switch(e.keyCode) {
        case 46:
          if(this.stageMode) {
            ActorSelection.delete();
          }
          else {
            GraphSelection.delete();
          }
          break;
      }
    },
    onSelectChange(selected) {
      if(selected) {
        if(selected.deletable) {
          this.enabled = true;
        }
        else {
          // check if it is actor selection
          this.enabled = selected.length > 0
        }
      }
      else {
        this.enabled = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#delete-button {
  width: 68px;
  width: 68px;

  margin-right: 50px;
  margin-left: 50px;
}

#delete-button.disabled {
  opacity: 0.2;
  cursor: 'auto';
  pointer-events: 'none';
}

</style>
