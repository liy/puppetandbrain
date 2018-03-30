<template>
<nav v-if="showHeader">
  <div class="nav-content">
    <button class="navbar-button" @click="() => { navCollapsed=false }"><svg><use :xlink:href="`#${NavButtonIcon.id}`" :viewBox="NavButtonIcon.viewBox"/></svg></button>
    <router-link to="/" tag="span" data-version="α" class="logo">PUPPET & BRAIN</router-link>
    <div class="nav-underlay" :class="{'nav-opened': !navCollapsed}" @click="() => { navCollapsed=true }"></div>
    <div class="nav-bar" :class="{'nav-opened': !navCollapsed}">
      <div class="nav-list">
        <router-link class="nav-link" :to="'/tutorials'" tag="a" @click.native="() => { navCollapsed=true }">
          <svg><use :xlink:href="`#${TutorialIcon.id}`" :viewBox="TutorialIcon.viewBox"/></svg>
          <span>Tutorials</span>
        </router-link>
        <router-link class="nav-link" :to="'/help'" tag="a" @click.native="() => { navCollapsed=true }">
          <svg><use :xlink:href="`#${HelpIcon.id}`" :viewBox="HelpIcon.viewBox"/></svg>
          <span>Help</span>
        </router-link>
      </div>
      <div class="nav-list">
        <router-link :to="'/editor'">
          <app-button class='major tutorial-button'>New Creation</app-button>
        </router-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import TutorialIcon from '../assets/icons/tutorial-icon.svg';
import HelpIcon from '../assets/icons/help-icon.svg';
import NavButtonIcon from '../assets/icons/nav-button-icon.svg';


export default {
  name: 'app-header',

  props: ['title'],
  computed: {
    showHeader() {
      return this.$route.path == '/' || this.$route.path == '/creations' || this.$route.path == '/help'
    }
  },

  data() {
    return {
      TutorialIcon,
      HelpIcon,
      NavButtonIcon,

      navCollapsed: true,
    }
  }
}
</script>


<style lang="scss" scoped>
nav {
  font-size: 16px;

  position: fixed;
  z-index: 2;
  width: 100%;

  margin: 0;
  height: 56px;
  background-color: #FFF;
  color: #35495E;

  box-shadow: 0 0 3px rgba(0,0,0,.2);

  .nav-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    height: 56px;
    line-height: 56px;

    margin: auto;
    max-width: 75rem;
  }

  .nav-bar {
    font-size: 0.9em;
    flex-grow: 1;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // vertical centre fields in the content
    align-items: center;
  }

  a {
    text-decoration: none;

    color: #ffffff;
    font-weight: 400;
  }

  .nav-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    // vertical centre fields in the content
    align-items: center;
  }

  .nav-link {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    // vertical centre fields in the content
    align-items: center;

    cursor: pointer;

    min-height: 32px;
    margin-right: 40px;

    span {
      // color: white;
      color:rgb(96, 115, 134);
      font-size: 1.1em;
    }

    svg {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  }

  .nav-link:hover {
    span {
      color:#333333;
    }
    svg {
      --fill: #333333;
    }
  }
}

nav span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
}

.logo {
  font-size: 1.1em;
  font-weight: 600;
  line-height: 20px;
  margin-right: 40px;
  white-space: nowrap;

  cursor: pointer;
}

.logo::after {
  content: attr(data-version);
  color:rgb(212, 212, 212);
  margin-left: 5px;
  font-size: 0.8em;
}

.navbar-button {
  position: absolute;
  left: 10px;
  top: 10px;

  display: none;
  border: none;
  background-color: transparent;
  outline: none;

  svg {
    width: 32px;
    height: 32px;
  }
}

.nav-underlay {
  display: none;
}

.nav-underlay.nav-opened {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;


  background-color:black;
  opacity: 0.8;
}

nav .nav-bar.nav-opened {
  display: flex;
}

@media screen and (max-width: 950px) {
  .logo {
    text-align: center;
    margin: 0;
  }

  nav .nav-content {
    justify-content: center;
  }

  .navbar-button {
    display: block;
  }

  nav .nav-bar {
    display: none;

    position: fixed;
    left: 0;
    top: 0;
    flex-direction: column;
    height: 100%;
    width: 200px;
    background-color: rgb(248, 248, 248);

    border-right: 1px solid rgb(212, 212, 212);
  }

  nav .nav-list {
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    
    // border-bottom: 1px solid rgb(224, 224, 224);
  }

  nav .nav-link {
    font-size: 1.5em;
    width: 100%;
    margin: 0;

    margin-left: 20px;

    height: 64px;
    line-height: 64px;
  }

  nav .nav-list:last-child {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
