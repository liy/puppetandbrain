<template>
<transition name="shareMenu">
<div v-if="shareMenuVisible" class="share-menu-container">
  <div @click="close" class="share-menu-underlay"/>
  <div class="share-menu">
    <div class="share-menu-button" @click="twitterShare">
      <svg>
        <use :xlink:href="`#${TwitterIcon.id}`" :viewBox="TwitterIcon.viewBox"/>
      </svg>
      <p>Twitter</p>
    </div>
    <div class="share-menu-button" @click="facebookShare">
      <svg>
        <use :xlink:href="`#${FacebookIcon.id}`" :viewBox="FacebookIcon.viewBox"/>
      </svg>
      <p>Facebook</p>
    </div>
  </div>
</div>
</transition>
</template>

<script>
import {mapGetters} from 'vuex'
import TwitterIcon from '@/assets/icons/twitter-icon.svg';
import FacebookIcon from '@/assets/icons/facebook-icon.svg';
import {sharePopup} from '@/utils/utils';

export default {
  data() {
    return {
      TwitterIcon,
      FacebookIcon,
    }
  },
  computed: {
    ...mapGetters(['shareMenuVisible']),
  },
  methods: {
    close() {
      this.$store.commit('updateShareMenuVisible', false);
    },
    facebookShare() {
      // Make sure it is saved
      const activityID = Hub.share();

      // domain defined in webpack
      let link = encodeURIComponent(`${DOMAIN}/editor/${activityID}`)
      let hashTag = '#puppetandbrain';
      let url = `https://www.facebook.com/dialog/share?app_id=${FACEBOOK_APP_ID}&href=${link}&hashtag=${hashTag}`
      sharePopup(url);

      this.$store.commit('updateShareMenuVisible', false);
    },
    twitterShare() {
      // Make sure it is saved
      const activityID = Hub.share();

      // domain defined in webpack
      let link = `${DOMAIN}/editor/${activityID}`
      let text = encodeURI(`I created a puppet! ${link}`);
      let hashTag = 'puppetandbrain';
      let url = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashTag}`
      sharePopup(url);

      this.$store.commit('updateShareMenuVisible', false);
    }
  }
}
</script>

<style lang="scss" scoped>
.share-menu-container {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  z-index: 11;
  
  transition: opacity ease 0.3s;
}

.share-menu-underlay {
  position: absolute;
  width: 100%;
  height: 100%;

  z-index: -1;

  background-color: rgba(255, 255, 255, 0.8);
}

.share-menu {
  position: relative;
  max-width: 300px;
  // background: #2c2b33;
  border-radius: 15px;
  padding: 50px 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.share-menu-button {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 30px;

  cursor: pointer;

  svg {
    width: 100px;
    height: 100px;

    transition: transform ease 0.3s;
  }

  svg:hover {
    transform: scale(1.1);
  }

  text-align: center;
  p {
    font-size: 1.4em;
    margin-top: 10px;
  }
}

.shareMenu-leave-active {
  opacity: 0;
}

.shareMenu-enter {
  opacity: 0;
}
</style>
