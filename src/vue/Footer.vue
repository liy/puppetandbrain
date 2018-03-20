<template>
  <footer>
    <ul>
      <li><router-link :to="'/contact'">Contact</router-link></li>
      <li><router-link :to="'/about'">About</router-link></li>
      <li><router-link :to="{name:'que-ans'}">Q&A</router-link></li>
    </ul>
  </footer>
</template>

<script>
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  font-size: 18px;
  width: 100%;
  bottom: 0;
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

  background-color: #475586;
  padding: 5px 10px;
  border-radius: 4px;

  a {
    color: #6f7dad;
    text-decoration: none;
    transition: color ease 0.3s;
  }

  a:hover {
    color: #f4e6ff;
  }
}
</style>
