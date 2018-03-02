<template>
  <footer>
    <ul>
      <li><router-link v-bind:to="'/contact'">Contact</router-link></li>
      <li><router-link v-bind:to="'/about'">About</router-link></li>
    </ul>
  </footer>
</template>

<script>
</script>

<style lang="scss" scoped>
footer {

  position: absolute;
  width: 100%;
  bottom: 0;
}

span {
  margin-left: 20px;
}

ul {
  float: right;
  
  list-style: none;
  padding: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 20px;
}

li {
  margin-left: 20px;

  a {
    color: #d191ff;
    text-decoration: none;
    transition: color ease 0.3s;
  }

  a:hover {
    color: #f4e6ff;
  }
}
</style>
