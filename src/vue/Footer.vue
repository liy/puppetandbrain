<template>
  <footer>
    <div class="footer-wrapper">
      <ul>
        <li><router-link :to="'/contact'">Contact</router-link></li>
        <li><router-link :to="'/about'">About</router-link></li>
        <li><router-link :to="{name:'que-ans'}">Q&A</router-link></li>
        <!-- <li><a href="https://www.patreon.com/bePatron?u=8507773" target="_blank"><img width="150" :src="require('@/assets/icons/become_a_patron_button.png')"/></a></li> -->
        <!-- <li><a href="https://www.patreon.com/puppetandbrain" target="_blank"><img width="150" :src="require('@/assets/icons/become_a_patron_button.png')"/></a></li> -->
      </ul>
      <span class="logo" data-version="α">PUPPET & BRAIN</span>
    </div>
  </footer>
</template>

<script>
</script>

<style lang="scss" scoped>
footer {
  font-size: 18px;
  width: 100%;
  bottom: 0;

  height: 150px;

  display: flex;
  flex-direction: row;
  justify-content: center;

}

.footer-wrapper {
  width: 75rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #33263a;
}

.logo {
  margin-right: 60px;
  font-size: 1.2em;
  font-weight: 600;
  line-height: 20px;
  color: #4f3f57;
  white-space: nowrap;

}

ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  list-style: none;
  padding: 0;
  margin: 0;
  
}

li {
  margin-left: 20px;

  padding: 5px 10px;
  border-radius: 4px;

  a {
    color: #66566e;
    text-decoration: none;
    transition: color ease 0.3s;
  }

  a:hover {
    color: #FFFFFF;
  }
}

@media screen and (max-width: 950px) {
  li {
    margin-left: 0;
  }

  .logo {
    display: none;
  }

  .footer-wrapper {
    justify-content: center;
  }
}
</style>
