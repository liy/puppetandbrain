<template>
<transition name='home'>
<div id='home' ref='home'>
  <div class='container'>
    <div class="splash">
      <div class="splash-content">
        <img :src="require('@/assets/banner-placeholder.png')"/>
        <div class="splash-text">
          <h1>Choose your puppet<br/>Program its brain<br/>Share your creations</h1>
          <p>Yet another creative platform for children to learn game programming, but with node based visual scripting flavour!</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="banner challenge-section">
        <div class="banner-wrapper">
          <div class="banner-text">
            <h1>Fortight challenges</h1>
            <p>Puppet & Brain supply fortnight challenge helps children to develop creative skill. There are abundant game assets and animations help you to realise your imagnations.</p>
          </div>
          <img/>
        </div>
      </div>
      <div class="white-section">
        <div>
          <h1>Create and share</h1>
          <p>Save and reuse your own puppets. Share your creations to your friends and family</p>
          <div><span>{{numPuppets}} puppets</span> <span>{{numCreations}} creations</span></div>
        </div>
      </div>
      <div class="banner curriculum-section">
        <div class="banner-wrapper">
          <div class="banner-text">
            <h1>Curriculum for teachers and parents</h1>
            <p>Ready to use curriculum activities allow teachers and parents engage with children in many diffrent subjects other than programming. Feel free to modify the activities to suit your own needs.</p>
          </div>
          <img/>
        </div>
      </div>
      <div class="white-section">
        <div>
          <h1>Special needs in mind</h1>
          <p>Puppet & Brain curriculum activities support variety of switch access devices and methods so everybody can learn.</p>
        </div>
      </div>
      <div class="banner guru-section">
        <div class="banner-wrapper">
          <h3>Are you a code guru?</h3>

          <div class="sub-section">
            <div class="banner-text">
              <h1>Node based visual scripting</h1>
              <p>Node based visual scripting is widely used in major game engines and computer graphics applications. Experience and learn game programming without compromise.</p>
            </div>
            <div class="guru-box-wrapper">
              <div class="guru-box"><img/></div>
            </div>
          </div>

          <div class="sub-section">
            <div class="guru-box-wrapper">
              <div class="guru-box"><img/></div>
            </div>
            <div class="banner-text">
              <h1>Reasonging your program</h1>
              <p>A intuitively execuiton and data flow visualization helps you reasoning the program and reinforce your logic thinking.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <app-footer></app-footer>
</div>
</transition>
</template>

<script>
import Footer from '@/vue/Footer.vue';

export default {
  data() {
    return {
    }
  },
  computed: {
    numPuppets() {
      return 1232;
    },
    numCreations() {
      return 2135;
    }
  },
  components: {
    'app-footer': Footer
  }
}
</script>

<style lang="scss">
#home {
  font-size: 18px;

  .container {
    width: 100%;
    background-color: #E6E6E6;

    .splash {
      width: 100%;
      background-color: #167DA8;

      .splash-content {
        position: relative;
        padding: 10px;
        margin: 0 auto;
        max-width: 60rem;

        img {
          width: 55%;
          // remove the white space below img
          display: inline-block;
        }

        .splash-text {
          color: white;
          width: 40%;
          float: right;

          h1 {
            color: #F2F2F2;
          }
        }
      }
    }

    .content {
      background-color: #FAFAFA;
      margin: auto;

      max-width: 60rem;

      display: flex;
      flex-direction: column;

      h1 {
        font-family: "jaf-domus", Arial, Helvetica, sans-serif;
        font-size: 1.3em;
        margin: 0;
      }
    }

    .banner {
      position: relative;
      left: -2%;
      width: 104%;

      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

      margin-top: 20px;

      .banner-wrapper {
        margin: 30px 40px;
      }

      .banner-text {
        display: inline-block;
        width: 60%;

        p {
          color: #FFFFFF;
          margin-bottom: 0;
        }
      }
    }

    .white-section {
      text-align: center;
      padding-top: 20px;
      padding-bottom: 20px;
      
      p {
        margin: 20px auto 0 auto;
        width: 60%;
      }
    }

    .challenge-section {
      background-color: #F2881E;
      border-radius: 10px;
    }

    .curriculum-section {
      background-color: #CCBD19;
      border-radius: 10px;
    }

    .guru-section {
      background-color: #4B3FA5;
      border-radius: 10px;

      .guru-box-wrapper {
        width: 30%;
        height: 100%;
      }

      .guru-box {
        background-color: white;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        opacity: 0.3;
      }

      .sub-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .sub-section:last-child {
        margin-top: 40px;
      }
    }
  }
}
</style>
