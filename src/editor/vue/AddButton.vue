<template>
<div class='toolbar-button' id='add-button' :data-title="tooltip" @click="clicked">
  <svg >
    <use :xlink:href="`#${AddButtonIcon.id}`" :viewBox="AddButtonIcon.viewBox"/>
  </svg>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import AddButtonIcon from '@/assets/add-button-icon.svg';
import PuppetBrowser from '../browser/PuppetBrowser'
import BlockBrowser from '../browser/BlockBrowser'
import SoundEffect from '@/SoundEffect';

export default {
  data() {
    return {
      AddButtonIcon,
    }
  },
  computed: {
    ...mapGetters(['stageMode']),
    tooltip() {
      return this.stageMode ? 'Add puppet' : 'Add block'
    }
  },
  methods: {
    async clicked() {
      SoundEffect.play('click');
      if(this.stageMode) {
        Hub.openPuppetBrowser();
      }
      else {
        let pod = await Hub.openBlockBrowser();
        if(pod) Hub.history.push(Commander.create('CreateBlock', pod, BrainGraph.brain.owner.id).processAndSave());
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#add-button {
  svg {
    width: 120px;
    height: 120px;
  }
}

@media screen and (max-width: 600px) {
  #add-button {
    svg {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
