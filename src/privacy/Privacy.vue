<template>
<transition name='Privacy Policy'>
<div class='privacy-policy'>
    <div class='content'>
      <div class="back"><a  @click="$router.push({name: 'Home'})">x</a></div>
      <p>We only collect analytics data for monitoring and improve our service. Google Analytics is used for providing analytics serivce, IP related data is anonymous. Cookie is also anonymous and only for temporary login, you can clear the cookie in the browser.</p>
      <p>User created activity data is securely transferred through SSL and stored on Goolge Cloud service.</p>
    </div>
</div>
</transition>
</template>

<script>
export default {
  name: 'privacy'
}
</script>

<style lang="scss" scoped>
.privacy-policy {
  position: absolute;
  width: 100%;
  height: 100%;

  color: white;
  
  transition: opacity ease 0.3s;

  .tiny {
    font-size: 0.7em;
    color: #95d0ff;
  }
  
  .content {
    padding: 0;

    width: 60%;
    max-width: 450px;
    list-style: none;

    margin: 20px auto;
  }

  a.back {
    color: #40a6f7;
  }

  .back {
    text-decoration: none;
    font-family: arial, sans-serif;
    font-size: 60px;
    margin-bottom: 20px;
    
    color:#6cbdff;

    text-align: center;

    transition: color ease 0.3s;

    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    
    cursor: pointer;
  }
  
  .back:hover {
    color:white;
  }
}

.privacy-leave-active {
  opacity: 0;
}

.privacy-enter {
  opacity: 0;
}

</style>

