<template>
<div id='history-control'>
  <svg id='blob' width=164 height=98>
    <use :xlink:href="`#${HistoryButtonBlob.id}`" :viewBox="HistoryButtonBlob.viewBox"/>
  </svg>
  <div id='undo' data-title='Undo'>
    <svg  width=78 height=78 >
      <use :xlink:href="`#${UndoButton.id}`" :viewBox="UndoButton.viewBox"/>
    </svg>
  </div>
  <div id='redo' data-title='Redo'>
    <svg width=55 height=55>
      <use :xlink:href="`#${RedoButton.id}`" :viewBox="RedoButton.viewBox"/>
    </svg>
  </div>
</div>
</template>

<script>
import HistoryButtonBlob from '@/assets/history-button-blob.svg';
import UndoButton from '@/assets/undo-button.svg';
import RedoButton from '@/assets/redo-button.svg';

export default {
  name: 'history-control',
  data() {
    return {
      HistoryButtonBlob,
      UndoButton,
      RedoButton
    }
  }
}
</script>

<style lang="scss" scoped>
#history-control {
  position: relative;
  margin-left: 20px;
}

#undo {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(49px, 49px) translate(-50%, -50%);
}

#redo {
  position: absolute;
  left: 129px;
  top: 49px;
  transform: translate(-50%, -50%);
}

</style>
