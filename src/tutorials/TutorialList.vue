<template>
<transition name='tutorial-list'>
<div class='tutorial-list'>
  <div class='list-container'>
    <div><a class="back" @click="$router.go(-1)">x</a></div>
    <div class='description'>Tutorial selections</div>
    <ol>
      <li><b><router-link v-bind:to="'/tutorials/animate-a-puppet'">Animate a puppet</router-link></b></li>
      <li><b><router-link v-bind:to="'/tutorials/user-interaction'">User interaction</router-link></b></li>
    </ol>
    <div class='no-tutorial'><router-link v-bind:to="'/editor'">No tutorials! I'm a professional programmer</router-link></div>
  </div>
</div>
</transition>
</template>

<script>
import PullIcon from '@/assets/pull-icon.svg';

export default {
  data() {
    return {PullIcon}
  },
  name: 'tutorial-list'
}
</script>

<style lang="scss" scoped>
.tutorial-list {
  position: absolute;
  font-family: "jaf-domus-titling-web",sans-serif;

  width: 100%;
  height: 100%;

  color: white;

  .list-container {
    margin: 20px auto;
    text-align: center;
  }

  .description {
    font-size: 14px;
    color: #c199e5;
  }

  ol {
    text-align: center;
    padding: 0;

    list-style: none;
    text-align: center;
  }

  a {
    color: #ac85d1;
    text-decoration: none;
    font-size: 40px;

    line-height: 2em;

    transition: color ease 0.3s;
  }
  
  a:hover {
    color:#ead5fd;
  }

  .back {
    font-family: arial, sans-serif;
    font-size: 60px;

    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    cursor: pointer;
  }

  .back:hover {
    color:white;
  }

  .no-tutorial a {
    font-size: 0.9em;
    color: #9c72c4;
    // text-decoration: underline;
  }

  .no-tutorial a:hover {
    color:#ead5fd;
  }
  
  transition: opacity ease 0.3s;
}

.tutorial-list-leave-active {
  opacity: 0;
}

.tutorial-list-enter {
  opacity: 0;
}

</style>

