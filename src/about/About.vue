<template>
<transition name='about'>
<div class='about'>
    <div class='content'>
      <div class="back"><a  @click="$router.push({name: 'Home'})">x</a></div>

      <p>Puppet & Brain is a creative platform for children to learn game programming which helps to develop their creativities and logic thinking.</p>

      <p>The core programming experience Puppet & Brain provides is an intuitive node based visual scripting language which is used in major game engines and graphics applications. By learning through tutorials, taking on challenges at different levels, children from age of 6 to 15 are able to learn fundamental programming concepts and can produce simple games, activities and stories of their own. Through creation of their own games,  children can improve their ability of logic thinking, problem solving, collaborating with friends, and enhance creativity. They will be able to apply the experience and knowledge to the real world programming and game creation.</p>

      <p>Puppet & Brain provides a library of animated puppets. Children can program the brain of the puppets using node based visual scripting language. It also allows children to upload  images and pictures  to make their own puppets and activities.</p>
      
      <p>Puppet & Brain is a safe, fun and inspiring place for children to create and share their creations.</p>

      <p>We are adding more animated puppets and improving the website.  If you have suggestions or would like to contribute, please get in touch.</p>

      <p class='who'>Design and hand crafted by <b>Liy</b>.<br/>Art and animation: <b>Liy</b>.<br/>Partnership Development and Marketing: <b>Ting</b></p>
      <p><a href="https://www.patreon.com/puppetandbrain" target="_blank"><img width="150" :src="require('@/assets/icons/become_a_patron_button.png')"/></a></p>
      
      <p class='refs'>Music made by <a href="https://www.bensound.com" title="Bendsound">Benjamin Tissot</a> from <a href="https://www.bensound.com" title="Bensound">www.bensound.com</a> is licensed by <a href="https://creativecommons.org/licenses/by-nd/3.0/legalcode" title="Creative Commons 3.0" target="_blank">Creative Commons 3.0</a></p>
      <p class='refs'>Hand cusor, music note, color picker and bin icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
      <p class='refs'>Landing page icons: Cat, dog, ufo, computer, gamepad, coin, rocket, spark, flask, people, notepad are made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
      
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

    -moz-user-select: none;
    -webkit-user-select: none;
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

