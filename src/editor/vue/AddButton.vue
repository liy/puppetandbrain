<template>
<div class='toolbar-button' id='add-actor-button' data-title="Add puppet" @click="clicked">
  <svg width=120 height=120>
    <use :xlink:href="`#${AddButtonIcon.id}`" :viewBox="AddButtonIcon.viewBox"/>
  </svg>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import AddButtonIcon from '@/assets/add-button-icon.svg';
import PuppetBrowser from '../browser/PuppetBrowser'
import BlockBrowser from '../browser/BlockBrowser'

export default {
  data() {
    return {
      AddButtonIcon,
    }
  },
  computed: {
    ...mapGetters(['editorMode'])
  },
  methods: {
    async clicked() {
      if(this.editorMode == 'stage') {
        let browser = new PuppetBrowser();
        browser.open()
      }
      else {
        let browser = new BlockBrowser();
        let pod = await browser.open();
        if(pod) EditorHistory.push(Commander.create('CreateBlock', pod, BrainGraph.brain.owner.id).processAndSave());
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#add-actor-button {
  width: 120px;
  height: 120px;
}
</style>
