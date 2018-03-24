<template>
<transition name='que-ans'>
<div class='que-ans'>
  <div class='content'>
    <div class="back"><a  @click="$router.push({name: 'Home'})">x</a></div>
    <ul>
      <li>
        <p class='q'>What is a puppet?</p>
        <p class='a'>In short, it is an object which you can manipulate by adding programming blocks in its brain. In game programming term it is a programmable actor, which probably does not make any sense to you...</p>
      </li>
      <li>
        <p class='q'>Why do you give brain to a puppet?</p>
        <p class='a'>In order to control it. Puppeteer use wooden bar and lines to control marionette. Game programmers use code and blocks to control it.</p>
      </li>
      <li>
        <p class='q'>Can I have my own puppets?</p>
        <p class='a'>We now provide animated puppets; but you can also upload images of your choice as puppets to create your game.</p>
      </li>
      <li>
        <p class='q'>Can I share my created puppets?</p>
        <p class='a'>You cannot directly share puppet by its own. But you can share the game you created and other people can then save your puppet into their own library.</p>
      </li>
    </ul>
  </div>
</div>
</transition>
</template>

<script>
export default {
  name: 'que-ans'
}
</script>

<style lang="scss" scoped>
.que-ans {
  position: absolute;
  width: 100%;
  height: 100%;

  transition: opacity ease 0.3s;
}

.back {
  text-decoration: none;
  font-family: arial, sans-serif;
  font-size: 60px;
  margin-bottom: 20px;
  
  color:#858585;

  text-align: center;

  transition: color ease 0.3s;

  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  
  cursor: pointer;
}

ul {  
  text-align: left;
  padding: 0;

  width: 60%;
  max-width: 600px;
  list-style: none;

  margin: 20px auto;
}

p.q {
  color:#858585
}

p.q:before {
  content: "Q: ";
  font-weight: bold;
}

p.a {
  color:#000000
}

p.a:before {
  content: "A: ";
  font-weight: bold;
}


.que-ans-leave-active {
  opacity: 0;
}

.que-ans-enter {
  opacity: 0;
}

</style>
