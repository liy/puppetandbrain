<template>
<transition name='about'>
<div class='about'>
    <div class='content'>
      <div class="back"><a  @click="$router.go(-1)">x</a></div>

      <p><b>Puppet & Brain</b> is a simple node based visual scripting service teaching kids programming concepts. It can also be used for creating simple story activity and game.</p>
      <p>It also support certain special needs functionallities, e.g., switch access.</p>

      <p class='tiny'>Actually, you can say that it is a naive Unreal Engine Blueprint clone works in the browser.</p>

      <p>I worked in a special needs company for quite a while before I started this project. Currently banging my head against the keyboard to fix the bugs.</p>

      <p>If you found any bugs, or have any questions and suggestions. I would be very much appreciated if you could <router-link class='contact' to='/contact' tag='a'>contact me</router-link>.</p>
      
      <p class='who'>Design and hand crafted by <b>Liy</b>.<br/>Art and animation by <b>Liy</b>.</p>
      
      <p class='refs'>Hand cusor, music note, color picker and bin icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
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

  color: white;
  
  transition: opacity ease 0.3s;

  .tiny {
    font-size: 0.7em;
    color: #95d0ff;
  }
  
  .content {
    padding: 0;

    width: 60%;
    max-width: 450px;
    list-style: none;

    margin: 20px auto;
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
    margin-bottom: 20px;
    
    color:#6cbdff;

    text-align: center;

    transition: color ease 0.3s;

    user-select: none;
    cursor: pointer;
  }
  
  .back:hover {
    color:white;
  }

  .who {
    color: #95d0ff;
    font-size: 0.7em;
    margin-top: 40px;
  }

  .refs {
    color: #95d0ff;
    font-size: 0.7em;
    margin-top: 40px;
    a {
      color: #95d0ff;
    }
  }
}

.about-leave-active {
  opacity: 0;
}

.about-enter {
  opacity: 0;
}

</style>

