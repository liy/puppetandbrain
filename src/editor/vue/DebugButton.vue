<template>
<div @click='click' class='toolbar-button' data-title="Play game">
  <svg v-if="!debugMode" width=100 height=100>
    <use :xlink:href="`#${StartButtonIcon.id}`" :viewBox="StartButtonIcon.viewBox"/>
  </svg>
  <svg v-else width=100 height=100>
    <use :xlink:href="`#${StopButtonIcon.id}`" :viewBox="StopButtonIcon.viewBox"/>
  </svg>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import StartButtonIcon from '@/assets/play-button-icon.svg'
import StopButtonIcon from '@/assets/stop-button-icon.svg'

export default {
  name: 'debug-button',
  data() {
    return {
      StartButtonIcon,
      StopButtonIcon
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['debugMode'])
  },
  methods: {
    ...mapMutations(['toggleDebugMode']),
    click() {
      this.$store.commit('toggleDebugMode')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
