<template>
<transition name='questions'>
<div class='que-ans'>
    <div class='content'>
      <div class="back"><a  @click="$router.push({name: 'Home'})">x</a></div>

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
.back {
  text-decoration: none;
  font-family: arial, sans-serif;
  font-size: 60px;
  margin-bottom: 20px;
  
  color:#eeeeee;

  text-align: center;

  transition: color ease 0.3s;

  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  
  cursor: pointer;
}
</style>
