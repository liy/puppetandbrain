<template>
<div id='guide-menu' @click="toggle()" @touchmove.prevent :class="{shifted: propertyPanelVisable && !stageMode && !browserVisible}">
  <div ref="button" id="guide-menu-icon">
    <svg width=48 height=48>
      <use :xlink:href="`#${MenuIcon.id}`" :viewBox="MenuIcon.viewBox"/>
    </svg>
  </div>
  <div id='menu-content' v-if='show'>
    <div class='menu-arrow'></div>
    <ul>
      <router-link to='/' tag='li'><a>Home</a></router-link>
      <li @click.prevent="newCreation"><a>New Creation</a></li>
      <router-link to='/tutorials' tag='li'><a>Tutorials</a></router-link>
      <router-link to='/help' tag='li'><a>Help</a></router-link>
      <router-link to='/contact' tag='li'><a>Contact</a></router-link>
      <router-link to='/about' tag='li'><a>About</a></router-link>
    </ul>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import MenuIcon from '@/assets/menu-icon.svg';
import {sharePopup} from '@/utils/utils';
import ConfirmModal from '../ui/ConfirmModal';

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
    async newCreation(e) {
      e.preventDefault();

      // check whether there is unsaved change
      // because the activity is dirty by default. We have to filter out the case of a brand new activity without
      // any modification. Simply check redo and undo of the history
      if(Hub.activity.dirty && (Hub.history.undos.length!=0 || Hub.history.redos.length!=0)) {
        const {action} = await ConfirmModal.open('Do you really want to leave? you have unsaved changes!', 'Unsaved changes')
        // user choose abort navigation
        if(!action) {
          return;
        }
      }
      
      // if user current has no saved activity, simply clear stage and recreate
      // a new activity, no need to route and trigger route hook
      if(Hub.router.path = '/editor') {
        Hub.clear();
        Hub.create();
      }
      else {
        // trigger route hooks, stage will be auto cleared and new activity will be created
        Hub.router.push(`/editor`)
      }
    },
    toggle() {
      this.show = !this.show;
    },
    close(e) {
      if(e.target != this.$refs.button) {
        this.show = false;
      }
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
