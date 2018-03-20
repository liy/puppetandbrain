<template>
<div id='toolbox' @touchmove.prevent :class="{hidden: hidden}">
  <!-- prevent pull to refresh on all the content of toolbox -->
  <history-control id='history-control'/>
  <div id='stage-toolbar' :class="{shifted: propertyPanelVisable && !stageMode}">
    <delete-button class='toolbar-button'/>
    <debug-button class='toolbar-button'/>
    <add-button class='toolbar-button'/>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import HistoryControl from './HistoryControl.vue'
import DebugButton from './DebugButton.vue'
import AddButton from './AddButton.vue'
import DeleteButton from './DeleteButton.vue'

import store from '@/store';

export default {
  name: 'toolbox',
  components: {
    'history-control': HistoryControl,
    'debug-button': DebugButton,
    'add-button': AddButton,
    'delete-button': DeleteButton,
  },
  computed: {
    ...mapGetters(['propertyPanelVisable', 'stageMode']),
    hidden() {
      return !this.stageMode && this.propertyPanelVisable
    }
  }
}
</script>

<style lang="scss">
#toolbox {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 160px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  // div container should not block events
  pointer-events: none;

  transition: opacity 0.3s ease;
}



@media screen and (max-width: 600px), screen and (max-height: 500px) {
  #toolbox {
    height: 100px;
  }
}

@media screen and (max-width: 890px) {
  #toolbox.hidden {
    opacity: 0;

      // disable button events
    .toolbar-button {
      pointer-events: none;
      svg {
        pointer-events: none;
      }
    }
  }
}

#stage-toolbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transform: translateX(0);
  transition: all ease 0.3s;
}

#stage-toolbar.shifted {
  transform: translateX(-300px)
}

.toolbar-button {
  position: relative;
  margin-right: 20px;

  cursor: pointer;

  // enable button events
  pointer-events: auto;
  svg {
    pointer-events: none;
  }
}

.toolbar-button.disabled {
  opacity: 0.2;
  cursor: default;
  pointer-events: none;
}


</style>
