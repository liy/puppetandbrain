<template>
<transition name='about'>
<div class='about'>
    <div class='content'>
      <div class="back"><a  @click="$router.push({name: 'Home'})">x</a></div>

      <p>Puppet & Brain is a creative platform for children to learn game programming. We especially focus on developing their creativities and logic thinking that are essential for their future.</p>

      <p>The core programming experience Puppet & Brain provides is an intutive node based visual scripting language. By learning the materials and taking on challanges at different levels, children age from 6-12 can learn fundamental programming concepts and basic game programming. There is a library of hand crafted animations and widgets for children to create and share their own animated stories, activites and games.</p>
      
      <p>Created by educators, parents and award wining special needs software developers, Puppet & Brain provides the teachers and parents a range of creative curriculums, which helps to engage children in learning different subjects. Certain curriculums also support switch access, so that children with special needs can also benifit from this platform.</p>

      <p>Our vision is building a community where children, teachers and parents can all learn programming and share their creations and experiences.</p>
      <p class='who'>Design and hand crafted by <b>Liy</b>.<br/>Art and animation: <b>Liy</b>.<br/>Partnership Development and Marketing: <b>Ting</b></p>
      
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

