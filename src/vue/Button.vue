<template>
<button><slot>Button</slot></button>
</template>

<script>
export default {
  name: 'app-button'
}
</script>

<style lang="scss" scoped>
button {
  text-transform: uppercase;

  outline: none;
  border: none;
  padding: 1px 25px 0 25px;
  border-radius: 18px;
  height: 32px;
  line-height: 32px;

  background-color: #dadada;
  color: white;

  cursor: pointer;

  transition: background-color 0.3s ease;
}

button:hover, button:focus {
  background-color: #cfcfcf;
}

button.primary {
  background-color: #0ca4f0;
}

button.primary:hover, button.primary:focus {
  background-color: rgb(0, 150, 224);
}

button.major {
  background-color: #f15a24;
}

button.major:hover, button.major:focus {
  background-color: #ec3f00;
}

button.info {
  background-color: #69a7e8;
}

button.info:hover, button.info:focus {
  background-color: #69a7e8;
}

</style>
