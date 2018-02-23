<template>
<nav v-if="showHeader">
  <router-link to="editor">
    <svg width=32 height=32>
      <use :xlink:href="`#${icon.id}`" :viewBox="icon.viewBox" style="--fill:#f2f2f2"/>
    </svg>
    <span>{{title}}</span>
  </router-link>
  <app-button>Sign In</app-button>
</nav>
</template>

<script>
import LogoIcon from '../assets/icons/logo.svg';

export default {
  name: 'app-header',

  props: ['title'],
  computed: {
    showHeader() {
      return this.$route.path != '/editor'
    }
  },

  data() {
    return {
      icon: LogoIcon
    }
  }
}
</script>

<style lang="scss">
nav {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #FFF;
  color: #35495E;

  display: flex;
  align-items: center;

  box-shadow: 0 0 3px rgba(0,0,0,.2);

  a {
    text-decoration: none;
    
    display: flex;
    align-items: center;

    color: #f2f2f2;

    margin-right: 30px;

    svg {
      margin-right: 10px;
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
</style>
