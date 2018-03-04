<template>
<transition name='about'>
<div class='about'>
    <div class='content'>
      <a class="back" @click="$router.go(-1)">x</a>

      <p><b>Puppet & Brain</b> is a simple node based programming service teaching kids programming concepts. It can also be used for creating simple story activity and game. It also support certain special needs functionallity, i.e. switch access.</p>

      <p class='tiny'>Actually, it is a naive Unreal Engine Blueprint clone works in the browser.</p>

      <p>I worked in a special needs company for quite a while before I started this project. Currently banging my head against the keyboard to fix the bugs.</p>

      <p>If you found any bugs or have any suggestions. I would be very much appreciated if you could <router-link class='contact' to='/contact' tag='a'>contact me</router-link>.</p>
      
      <p class='who'>Design and hand crafted by <b>Liy</b>.<br/>Art and animation by <b>Liy</b>.</p>
    </div>
</div>
</transition>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style lang="scss" scoped>
.about {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  
  transition: opacity ease 0.3s;

  .tiny {
    font-size: 0.3em;
    color: #95d0ff;
  }
  
  .content {
    padding: 0;

    width: 60%;
    max-width: 450px;
    list-style: none;
  }

  .contact {
    color: white;
    
    transition: color ease 0.3s;
  }

  .contact:hover {
    color: #ff8585;
  }

  a.back {
    color: #40a6f7;
  }

  .back {
    text-decoration: none;
    font-family: arial, sans-serif;
    font-size: 60px;
    margin-bottom: 60px;

    transition: color ease 0.3s;

    user-select: none;
    cursor: pointer;
  }
  
  .back:hover {
    color:white;
  }

  .who {
    color: #95d0ff;
    font-size: 14px;
    margin-top: 40px;
  }
}

.about-leave-active {
  opacity: 0;
}

.about-enter {
  opacity: 0;
}

</style>

