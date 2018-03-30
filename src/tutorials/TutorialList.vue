<template>
<transition name='tutorial-list'>
<div class='tutorial-list'>
  <div class='list-container'>
    <div><a class="back" @click="$router.push({name: 'Home'})">x</a></div>
    <div class='description'>Select the tutorials below</div>
    <ol>
      <li><router-link tag="span" v-bind:to="'/tutorials/animate-a-puppet'">Animation</router-link></li>
      <li><router-link tag="span" v-bind:to="'/tutorials/user-interaction'">User Interaction</router-link></li>
      <li><router-link tag="span" v-bind:to="'/tutorials/painter-tutorial'">Simple Painter</router-link></li>
    </ol>
    <div class='no-tutorial'><router-link v-bind:to="'/editor'">No tutorials! I'm a professional game developer</router-link></div>
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
  font-family: Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;

  width: 100%;
  height: 100%;

  color: white;

  .list-container {
    margin: 20px auto;
    text-align: center;
  }

  .description {
    margin: 30px 0;
    font-size: 1em;
    color: #c199e5;
  }

  ol {
    text-align: center;
    padding: 0;

    list-style: none;
    text-align: center;

    margin: 30px 0;
  }

  li {
    margin-top: 20px;
  }

  span {
    color: #f4e8ff;
    background-color: #ac85d1;
    border-radius: 40px;
    line-height: 59px;
    height: 59px;
    display: inline-block;
    width: 300px;

    cursor: pointer;

    transition: background-color ease 0.3s;
  }

  span:hover {
    background-color: #9c6dc7;
  }

  a {
    color: #ead5fd;
    text-decoration: none;
    transition: color ease 0.3s;
  }

  .back {
    color: #c199e5;
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
    margin-top: 10px;
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

// iPhone X
/* Portrait and Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 812px)  { 
  span {
    background-color: #ac85d1;
    border-radius: 40px;
    line-height: 59px;
    height: 59px;
    display: inline-block;
    width: 60%;

    a {
      padding: 10px 30px;
      margin: 0;
    }
  }
}

/* Portrait */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 812px) 
  and (-webkit-min-device-pixel-ratio: 3)
  and (orientation: portrait) { 

}

/* Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 812px) 
  and (-webkit-min-device-pixel-ratio: 3)
  and (orientation: landscape) { 

}

</style>

