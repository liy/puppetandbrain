<template>
<div class='toolbar-button' :class="{disabled: !this.enabled || this.deleteLock}" id='delete-button' data-title="Delete puppet" @click="clicked">
  <svg>
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
    this.onStageModeChange();
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  },
  computed: {
    ...mapGetters(['stageMode', 'deleteLock'])
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
    },
    onStageModeChange() {
      if(this.stageMode) {
        GraphSelection.off('block.selection.change', this.onSelectChange, this)
        ActorSelection.on('actor.selection.change', this.onSelectChange, this);
        this.onSelectChange(ActorSelection.selected);
      }
      else {
        ActorSelection.off('actor.selection.change', this.onSelectChange, this);
        GraphSelection.on('block.selection.change', this.onSelectChange, this);
        this.onSelectChange(GraphSelection.selected);
      }
    }
  },
  watch: {
    stageMode: function() {
      this.onStageModeChange();
    }
  }
}
</script>

<style lang="scss">
#delete-button {
  svg {
    width: 68px;
    height: 68px;
  }

  margin-right: 50px;
  margin-left: 50px;
}

@media screen and (max-width: 600px) {
  #delete-button {
    svg {
      width: 50px;
      height: 50px;
    }

    margin-right: 20px;
    margin-left: 20px;
  }
}
</style>
