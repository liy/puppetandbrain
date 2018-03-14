<template>
<div id="actor-list-container">
  <div id="actor-list">
    
  </div>
</div>
</template>

<script>
export default {
  name: 'actor-list'
}
</script>

<style lang="scss" scoped>
#actor-list-container {
  position: absolute;
  width: 300px;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

#actor-list {
  width: 220px;
  height: 400px;
  background-color: aliceblue;
}
</style>
