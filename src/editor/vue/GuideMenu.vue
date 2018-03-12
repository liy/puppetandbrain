<template>
<div id='guide-menu' @click="toggle()" :class="{shifted: propertyPanelVisable && !stageMode && !browserVisible}">
  <div ref="button" id="guide-menu-icon">
    <svg width=48 height=48>
      <use :xlink:href="`#${MenuIcon.id}`" :viewBox="MenuIcon.viewBox"/>
    </svg>
  </div>
  <div id='menu-content' v-if='show'>
    <div class='menu-arrow'></div>
    <ul>
      <router-link to='/' tag='li'><a>Home</a></router-link>
      <router-link to='/tutorials/animate-a-puppet' tag='li'><a>Tutorials</a></router-link>
      <router-link to='/contact' tag='li'><a>Contact</a></router-link>
      <router-link to='/about' tag='li'><a>About</a></router-link>
      <li><span @click="twitter">Share</span></li>
    </ul>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import MenuIcon from '@/assets/menu-icon.svg';
import {sharePopup} from '@/utils/utils';

export default {
  name: 'guide-menu',
  data() {
    return {
      MenuIcon,
      show: false,
    }
  },
  computed: {
    ...mapGetters(['propertyPanelVisable']),
    ...mapGetters(['stageMode']),
    ...mapGetters(['browserVisible']),
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    close(e) {
      if(e.target != this.$refs.button) {
        this.show = false;
      }
    },
    twitter(e) {
      // domain defined in webpack
      let link = `${DOMAIN}/editor/${Hub.activity.id}`
      let text = encodeURI(`Have look at my puppet: ${link}`);
      let hashTag = 'puppetandbrain';
      let url = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashTag}`
      sharePopup(url);

      // Make sure it is saved
      Hub.save().then(activity => {
        this.$router.push(`/editor/${activity.id}`)
      })
    }
  }
}
</script>

<style lang="scss">
#guide-menu {
  position: absolute;
  right: 20px;
  top: 35px;

  z-index: 9;

  transition: transform ease 0.3s;

  ul {
    font-size: 16px;

    list-style-type: none;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0;
  }

  li {
    line-height: 38px;
    height: 38px;
    cursor: pointer;
  }

  a, a:visited, span {
    color: #ded6ff;
    text-decoration: none;
    display: block;

    transition: color ease 0.3s;
  }
  
  a:hover, a:hover, span:hover {
    color: white;
  }

  svg {
    pointer-events: none;
  }
}

#menu-content {
  position: relative;

  min-width: 150px;
  background-color: #746b9c;
  border-radius: 10px;

  min-height: 30px;

  margin-top: 60px;

  .menu-arrow {
    position: absolute;
    top: -5px;
    right: 18px;
    background-color: #746b9c;
    width: 13px;
    height: 13px;
    transform: rotate(45deg);
  }
}

#guide-menu-icon {
  position: absolute;
  top: 0;
  right: 0;

  cursor: pointer;
}

#guide-menu.shifted {
  transform: translateX(-300px)
}
</style>
