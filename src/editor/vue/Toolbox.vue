<template>
<div id='toolbox'>
  <history-control id='history-control'/>
  <div id='stage-toolbar'>
    <div class='toolbar-button' id='bin-button' data-title="Delete puppet"></div>
    <div class='toolbar-button' id='debug-button' data-title="Play game"></div>
    <div class='toolbar-button' id='add-actor-button' data-title="Add puppet"></div>
  </div>
</div>
</template>

<script>
import HistoryControl from './HistoryControl.vue'

export default {
  name: 'toolbox',
  components: {
    'history-control': HistoryControl
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
