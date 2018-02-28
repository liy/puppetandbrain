<template>
<div id='history-control'>
  <svg id='blob' width=164 height=98>
    <use :xlink:href="`#${HistoryButtonBlob.id}`" :viewBox="HistoryButtonBlob.viewBox"/>
  </svg>
  <div id='undo' class='history-button' :class="{disabled: !canUndo()}" data-title='Undo' @click="undoClicked">
    <svg  width=78 height=78 >
      <use :xlink:href="`#${UndoButton.id}`" :viewBox="UndoButton.viewBox"/>
    </svg>
  </div>
  <div id='redo' class='history-button' :class="{disabled: !canRedo()}" data-title='Redo' @click="redoClicked">
    <svg width=55 height=55>
      <use :xlink:href="`#${RedoButton.id}`" :viewBox="RedoButton.viewBox"/>
    </svg>
  </div>
</div>
</template>

<script>
import HistoryButtonBlob from '@/assets/history-button-blob.svg';
import UndoButton from '@/assets/undo-button.svg';
import RedoButton from '@/assets/redo-button.svg'

export default {
  name: 'history-control',
  data() {
    return {
      HistoryButtonBlob,
      UndoButton,
      RedoButton
    }
  },
  mounted() {
    Hub.history.on('history.updated', () => {
      this.$forceUpdate()
    })
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    Hub.history.clear();
    document.removeEventListener('keydown', this.keydown);
  },
  methods: {
    undoClicked() {
      Hub.history.undo();
    },
    redoClicked() {
      Hub.history.redo();
    },
    canUndo() {
      return Hub.history.undos.length != 0;
    },
    canRedo() {
      return Hub.history.redos.length != 0;
    },
    keydown(e) {
      if(e.keyCode == '90' && e.ctrlKey) {
        Hub.history.undo();
      }
      if(e.keyCode == '89' && e.ctrlKey) {
        Hub.history.redo();
      }
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

.history-button {
  opacity: 1;
  cursor: pointer;
  pointer-events: auto;
}

.history-button.disabled {
  opacity: 0.2;
  cursor: default;
  pointer-events: none;
}

</style>
