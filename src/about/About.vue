<template>
<transition name='about'>
<div class='about'>
    <ul>
      <li><router-link v-bind:to="'/'" class="back">x</router-link></li>
      <li><p><b>Puppet & Brain</b> is a simple node based programming service teaching kids programming concepts. It can also be used for creating simple story activity and game.</p><li>
      <li>
        <p>Hand crafted and designed by <b>Liy</b>.
        <br/>Animation by <b>Liy</b>.</p>
      </li>
    </ul>
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
  
  
  ul {
    padding: 0;

    width: 40%;
    list-style: none;
  }

  .back {
    text-align: center;
    text-decoration: none;
    font-family: arial, sans-serif;
    font-size: 60px;
    color: #40a6f7;
    margin-bottom: 60px;

    transition: color ease 0.3s;
  }
  
  .back:hover {
    color:white;
  }

  // opacity: 1;
  transition: opacity ease 0.3s;
}

.about-leave-active {
  opacity: 0;
}

.about-enter {
  opacity: 0;
}

</style>

