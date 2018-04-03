<template>
<div id='share-button' data-title="Share creation" @click="clicked">
  <svg>
    <use :xlink:href="`#${ShareButtonIcon.id}`" :viewBox="ShareButtonIcon.viewBox"/>
  </svg>
</div>
</template>

<script>
import ShareButtonIcon from '@/assets/share-button-icon.svg';
import {sharePopup} from '@/utils/utils';

export default {
  data() {
    return {
      ShareButtonIcon,
    }
  },
  methods: {
    clicked() {
      this.$store.commit('updateShareMenuVisible', true);
    },
  }
}
</script>

<style lang="scss" scoped>
#share-button {
  position: relative;

  svg {
    width: 68px;
    height: 68px;
  }

  margin-left: 20px;
  
  cursor: pointer;
  pointer-events: auto;
}

@media screen and (max-width: 600px), screen and (max-height: 500px) {
  #share-button {
    svg {
      width: 50px;
      height: 50px;
    }


    left: -50px;
  }
}
</style>
