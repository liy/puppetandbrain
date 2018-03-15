<template>
<div id='debug-button' @click='click' class='toolbar-button' :class="{disabled: this.debugLock}" :data-title="tooltip">
  <svg v-if="!debugMode">
    <use :xlink:href="`#${StartButtonIcon.id}`" :viewBox="StartButtonIcon.viewBox"/>
  </svg>
  <svg v-else>
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
  computed: {
    ...mapGetters(['debugMode', 'debugLock']),
    tooltip() {
      return this.debugMode  ? 'Stop game' : 'Play game'
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

<style lang="scss">
#debug-button {
  svg {
    width: 100px;
    height: 100px;
  }
}

@media screen and (max-width: 600px), screen and (max-height: 400px) {
  #debug-button {
    svg {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
