<template>
<div class="block-context-menu-wrapper" :style="{display: blockContextMenuVisible ? 'flex' : 'none'}">
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['blockContextMenuVisible']),
  },
  methods: {
    templateContextMenu(pod) {
      console.log(pod)
      this.$store.commit('updateBlockContextMenuVisible', true)
    },
    blockContextMenu(node) {
      console.log(node)
      this.$store.commit('updateBlockContextMenuVisible', true)
    }
  },
  mounted() {
    Hub.on('block.template.contextmenu', this.templateContextMenu);
    Hub.on('block.contextmenu', this.blockContextMenu);
  },
  beforeDestroy() {
    Hub.off('block.template.contextmenu', this.templateContextMenu);
    Hub.off('block.contextmenu', this.blockContextMenu);
  }
}
</script>

<style lang="scss" scoped>
.block-context-menu-wrapper {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
