<template>
<div id='toolbox'>
  <history-control id='history-control'/>
  <div id='stage-toolbar'>
    <delete-button class='toolbar-button'/>
    <debug-button class='toolbar-button'/>
    <add-button class='toolbar-button'/>
  </div>
</div>
</template>

<script>
import HistoryControl from './HistoryControl.vue'
import DebugButton from './DebugButton.vue'
import AddButton from './AddButton.vue'
import DeleteButton from './DeleteButton.vue'

export default {
  name: 'toolbox',
  components: {
    'history-control': HistoryControl,
    'debug-button': DebugButton,
    'add-button': AddButton,
    'delete-button': DeleteButton,
  }
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
</style>
