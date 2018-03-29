<template>
<div v-if="blockDocTemplate" @click="close" class="block-doc-wrapper">
  <vue-block :template="blockDocTemplate"/>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Block from '@/help/Block.vue'

export default {
  components: {
    'vue-block': Block 
  },
  computed: {
    ...mapGetters(['blockDocTemplate']),
  },
  methods: {
    close() {
      this.$store.commit('closeBlockDoc');
    }
  }
}
</script>

<style lang="scss" scoped>
.block-doc-wrapper {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 11;
}
</style>
