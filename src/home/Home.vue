<template>
<transition name='home'>
<div id='home' ref='home'>
  <div class='container'>
    <div class="splash">
      <div class="splash-content" :style="{backgroundImage: splashImageUrl}">
        <img :src="require('@/assets/banner-placeholder.png')"/>
        <div class="splash-text">
          <h1>Choose your puppet<br/>Program its brain<br/>Share your creations</h1>
          <p>Yet another creative platform for children to learn game programming, but with node based visual scripting flavour!</p>
          <app-button class='major start-button'>Start playing</app-button>
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
          <div class="info"><span>{{numCreations}} creations</span></div>
        </div>
        <svg>
          <use :xlink:href="`#${CreateAndShareIcon.id}`" :viewBox="CreateAndShareIcon.viewBox"/>
        </svg>
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
        <svg>
          <use :xlink:href="`#${SpecialNeedsIcon.id}`" :viewBox="SpecialNeedsIcon.viewBox"/>
        </svg>
      </div>
      <div class="banner guru-section">
        <div class="banner-wrapper">
          <h3>Are you a code guru?</h3>

          <div class="guru-content">
            <div class="sub-section">
              <div class="banner-text">
                <h1>Node based visual scripting</h1>
                <p>Node based visual scripting is widely used in major game engines and computer graphics applications. Experience and learn game programming without compromise.</p>
              </div>
              <img :src="require('@/assets/icons/block.png')"/>
            </div>

            <div class="sub-section">
              <div class="banner-text">
                <h1>Reasonging your program</h1>
                <p>A intuitively execuiton and data flow visualization helps you reasoning the program and reinforce your logic thinking.</p>
              </div>
              <img :src="require('@/assets/icons/reasoning.png')"/>
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
import 'firebase/firestore'
import CreateAndShareIcon from '@/assets/icons/createandshare.svg'
import SpecialNeedsIcon from '@/assets/icons/specialneeds.svg'

export default {
  data() {
    return {
      numCreations: 0,
      CreateAndShareIcon,
      SpecialNeedsIcon,
      splashImageUrl: `url(${require('!file-loader!@/assets/icons/splashbg.svg')})`
    }
  },
  components: {
    'app-footer': Footer
  },
  mounted() {
    firebase.firestore().collection('info').doc('activities').onSnapshot(snapshot => {
      this.numCreations = snapshot.data().total;
    })
  }
}
</script>

<style lang="scss">
#home {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;

  padding-top: 56px;
  
  .start-button {
    display: block;
    background-color: #333333;
  }

  .container {
    width: 100%;
    background-color: #E6E6E6;
  }

  .splash {
    position: relative;
    z-index: 1;
    
    width: 100%;
    background-color: #167DA8;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

    .splash-content {
      position: relative;
      padding: 10px;
      margin: 0 auto;
      max-width: 75rem;

      padding: 60px 0;

      // images
      background-repeat: no-repeat;
      background-position: -40% 0%;
      background-size: cover;

      img {
        position: relative;
        z-index: 1;
        width: 55%;
        // remove the white space below img
        display: inline-block;
      }

      .splash-text {
        position: relative;
        z-index: 1;
        color: white;
        width: 40%;
        float: right;
        line-height: 1.8em;

        h1 {
          margin: 0;
          font-family: "jaf-domus", Arial, Helvetica, sans-serif;
          color: #F2F2F2;
          text-transform: uppercase;

          font-size: 1.6em;
          line-height: 1.4em;
        }
      }
    }
  }

  .content {
    background-color: #FAFAFA;
    margin: auto;
    padding-top: 20px;

    max-width: 75rem;

    display: flex;
    flex-direction: column;

    p {
      line-height: 1.7em;
    }

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
    z-index: 1;

    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

    .banner-wrapper {
      margin: 60px 80px;
    }

    .banner-text {
      display: inline-block;
      width: 60%;

      h1 {
        margin-bottom: 30px;
      }

      p {
        color: #FFFFFF;
        margin: 0;
      }
    }
  }

  .white-section {
    position: relative;
    text-align: center;
    padding: 40px 20px;

    .info {
      margin-top: 20px;
    }
    
    p {
      margin: 20px auto 0 auto;
      width: 60%;
    }

    svg {
      position: absolute;
      top: 50%;
      z-index: 0;
      
      transform-origin: 0 0;
      transform: scale(2) translate(-50%, -50%);
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

    .banner-text {
      width: 100%;
    }

    h3 {
      margin-top: 0;
      font-size: 18px;
      color: rgb(139, 132, 192)
    }

    .sub-section {
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  
  .guru-content {
    display:flex;
    flex-direction: row;
    justify-content: space-between;

    img {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
