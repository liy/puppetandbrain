<template>
<transition name='contact'>
<div class='contact'>
  <ul>
    <li><a class="back" @click="$router.push({name: 'Home'})">x</a></li>
    <li><b><a class='email' href="mailto:puppetandbrain@gmail.com">EMAIL</a></b></li>
    <li><b><a class='twitter' href="https://twitter.com/puppetandbrain">TWITTER</a></b></li>
    <li><b><a class='discord' href="https://discord.gg/RH8RnxA">DISCORD</a></b></li>
    <li><b><a class='github' href="https://github.com/liy">GITHUB</a></b></li>
  </ul>
</div>
</transition>
</template>

<script>
import PullIcon from '@/assets/pull-icon.svg';

export default {
  data() {
    return {PullIcon}
  },
  name: 'contact'
}
</script>

<style lang="scss" scoped>
.contact {
  position: absolute;
  font-family: "jaf-domus-titling-web",sans-serif;

  width: 100%;
  height: 100%;

  color: white;

  ul {
    text-align: center;
    padding: 0;

    width: 40%;
    list-style: none;

    margin: 20px auto;
  }

  a {
    color: #ffb1b1;
    text-decoration: none;
    font-size: 40px;

    line-height: 2em;

    transition: color ease 0.3s;
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
  
  .email:hover {
    color: #c340ff;
  }

  .twitter:hover {
    color: #ffeb3b;
  }

  .discord:hover {
    color: #2dbd34;
  }

  .github:hover {
    color: rgb(145, 224, 255);
  }

  svg:hover {
    --fill: white;
  }

  transition: opacity ease 0.3s;
}

.contact-leave-active {
  opacity: 0;
}

.contact-enter {
  opacity: 0;
}

</style>

