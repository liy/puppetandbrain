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
      // Make sure it is saved
      const activityID = Hub.share();

      // domain defined in webpack
      let link = `${DOMAIN}/editor/${activityID}`
      let text = encodeURI(`I created a puppet! ${link}`);
      let hashTag = 'puppetandbrain';
      let url = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashTag}`
      sharePopup(url);
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
