<template>
<div id='toolbox'>
  <history-control id='history-control'/>
  <div id='stage-toolbar'>
    <div class='toolbar-button' id='bin-button' data-title="Delete puppet">
      <svg width=68 height=68>
        <use :xlink:href="`#${BinButtonIcon.id}`" :viewBox="BinButtonIcon.viewBox"/>
      </svg>
    </div>
    <debug-button class='toolbar-button'/>
    <div class='toolbar-button' id='add-actor-button' data-title="Add puppet">
      <svg width=120 height=120>
        <use :xlink:href="`#${AddButtonIcon.id}`" :viewBox="AddButtonIcon.viewBox"/>
      </svg>
    </div>
  </div>
</div>
</template>

<script>
import HistoryControl from './HistoryControl.vue'
import DebugButton from './DebugButton.vue'
import AddButtonIcon from '@/assets/add-button-icon.svg';
import BinButtonIcon from '@/assets/bin-button-icon.svg';

export default {
  name: 'toolbox',
  components: {
    'history-control': HistoryControl,
    'debug-button': DebugButton,
  },
  data() {
    return {
      AddButtonIcon,
      BinButtonIcon
    }
  },
}
</script>

<style lang="scss" scoped>
#toolbox {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 160px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#stage-toolbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: all ease 0.3s;
}

.toolbar-button {
  position: relative;
  margin-right: 20px;
}

#add-actor-button {
  width: 120px;
  height: 120px;
}

#bin-button {
  width: 68px;
  width: 68px;

  margin-right: 50px;
  margin-left: 50px;
}
</style>
