<template>
<div id='debug-trace'></div>
</template>

<script>
export default {
  name: 'terminal'
}
</script>

<style>
#debug-trace {
  font-size: 16px;
  position: absolute;
  top: 10px;
  left: 10px;
  user-select: none;
  pointer-events: none;
  color: rgb(255, 109, 236);
  width: 300px;
  height: 300px;

  overflow: hidden;
  z-index: 2;
}
</style>
