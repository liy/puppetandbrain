<template>
<nav v-if="showHeader">
  <div class="content">
    <span class="logo">PUPPET & BRAIN</span>
    <router-link to="editor">
      <span>{{title}}</span>
    </router-link>
    <!-- <app-button>Sign In</app-button> -->
  </div>
</nav>
</template>

<script>
import LogoIcon from '../assets/icons/logo.svg';

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
      icon: LogoIcon
    }
  }
}
</script>

<style lang="scss">
nav {
  position: fixed;
  z-index: 2;
  width: 100%;

  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #FFF;
  color: #35495E;

  box-shadow: 0 0 3px rgba(0,0,0,.2);

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    height: 56px;
    line-height: 56px;

    margin: auto;
    max-width: 60rem;
  }

  a {
    text-decoration: none;
    
    // display: flex;
    // align-items: center;

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

.logo {
  font-size: 16px;
  font-weight: 600;
}

</style>
