<template>
<div id='debug-button' @click='click' class='toolbar-button' :data-title="tooltip">
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
import SoundEffect from '@/SoundEffect'

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
    ...mapGetters(['debugMode']),
    tooltip() {
      return this.debugMode ? 'Stop game' : 'Play game'
    }
  },
  methods: {
    ...mapMutations(['toggleDebugMode']),
    click() {
      SoundEffect.play('click');
      this.$store.commit('toggleDebugMode')
    }
  }
}
</script>