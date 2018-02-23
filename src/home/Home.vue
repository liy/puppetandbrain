<template>
<div class='container'>
  <div class='splash'>
    <div class='content'>
      <h1>Make your puppets<br/>Create the story<br/>Learn coding</h1>
      <div class='action'>
        <app-button class='major' @click.native="toEditor">Start learning</app-button>
        <app-button class='primary'>Sign Up</app-button>
      </div>
    </div>
    <img src="../assets/icons/logo@4x.png" alt="">
  </div>
  <div class='description'>
    <h4>
      <p>Detail descriptions</p>
    </h4>
  </div>
  <app-footer/>
</div>
</template>

<script>
import Footer from '../vueComponents/Footer.vue';

export default {
  components: {
    'app-footer': Footer
  },
  methods: {
    toEditor() {
      console.log('test')
      this.$router.push('editor')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
}

.splash {
  border-radius: 10px 10px 0 0;

  width: 100%;
  min-height: 400px;
  background-color: #2d7bcc;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
}

.content {
  margin-right: 50px;

  .primary {
    margin-left: 20px;
  }
}

.description {
  width: 100%;
  min-height: 200px;
  background-color: white;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 0;
  float: left;

  margin-bottom: 50px;
}

h4 {
  margin-right: 100px;
  float: left;
}
</style>
