<template>
<nav v-if="showHeader">
  <div class="nav-content">
    <span class="logo" data-version="α">PUPPET & BRAIN</span>
    <div class="nav-bar">
      <div class="nav-list">
        <router-link class="nav-link" :to="'/tutorials'" tag="div">
          <svg><use :xlink:href="`#${TutorialIcon.id}`" :viewBox="TutorialIcon.viewBox"/></svg>
          <span>Tutorials</span>
        </router-link>
        <router-link class="nav-link" :to="'/help'" tag="div">
          <svg><use :xlink:href="`#${HelpIcon.id}`" :viewBox="HelpIcon.viewBox"/></svg>
          <span>Help</span>
        </router-link>
      </div>
      <div class="nav-list">
        <router-link :to="'/editor'">
          <app-button class='major tutorial-button'>Create</app-button>
        </router-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import LogoIcon from '../assets/icons/logo.svg';
import TutorialIcon from '../assets/icons/tutorial-icon.svg';
import HelpIcon from '../assets/icons/help-icon.svg';

export default {
  name: 'app-header',

  props: ['title'],
  computed: {
    showHeader() {
      return this.$route.path == '/'
    }
  },

  data() {
    return {
      icon: LogoIcon,
      TutorialIcon,
      HelpIcon,
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
  padding: 0 16px 0 24px;
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
    // width: 100%;
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

    margin-right: 30px;
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

    border-radius: 16px;

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
}

.logo::after {
  content: attr(data-version);
  color:rgb(212, 212, 212);
  margin-left: 5px;
  font-size: 0.8em;
}

</style>
