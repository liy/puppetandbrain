<template>
  <footer>
    <span>Puppet & Brain</span>
    <ul>
      <li>About</li>
      <li>Help</li>
      <li>Privacy Policy</li>
    </ul>
  </footer>
</template>

<script>
  
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;

  position: absolute;
  width: 100%;
  bottom: 0;
}

span {
  margin-left: 20px;
}

ul {
  list-style: none;
  padding: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 20px;
}

li {
  margin-left: 20px;
}
</style>
