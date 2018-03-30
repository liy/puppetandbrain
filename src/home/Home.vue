<template>
<transition name='home'>
<div id='home' ref='home'>
  <div class='home-container'>
    <div class="splash">
      <img class="splash-bg" :src="require('!file-loader!@/assets/icons/splashbg.svg')"/>
      <div class="splash-content">
        <!-- <img :src="require('@/assets/banner-placeholder.png')"/> -->
        <!-- <img :src="require('!file-loader!@/assets/icons/splash-video.svg')"/> -->
        <!-- <div class="splash-logo">
          <img :src="require('!file-loader!@/assets/icons/characters-blue-dirt-purple.png')"/>
        </div> -->
        <iframe width="560" height="315" src="https://www.youtube.com/embed/VcjGIO5dDa0?&autoplay=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        <!-- <iframe src="https://player.vimeo.com/video/262184427" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->
        <div class="splash-text">
          <h1>Choose your puppet<br/>Program its brain<br/>Share your creations</h1>
          <p>Yet another creative platform for children to learn coding, but with node based visual scripting and game programming flavour!</p>
          <router-link :to="{name: 'Creations'}">
            <app-button class='black'>Explore</app-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="home-content">
      <div class="white-section tutorial-section">
        <div class="tutorial-section-wrapper">
          <div>
            <h1>Don't know programming?</h1>
            <p>No worries! You don't need programming experience at all, and there is a list of tutorials to help you get started!</p>
            <router-link :to="{name: 'TutorialList'}">
              <app-button class='primary tutorial-button'>Start Tutorials</app-button>
            </router-link>
          </div>
          <img :src="require('!file-loader!@/assets/icons/earth.png')"/>
        </div>
      </div>
      <div class="banner challenge-section">
        <div class="banner-wrapper">
          <div class="banner-text">
            <h1>Challenges for children</h1>
            <p>Puppet & Brain provides regular challenges to inspire children and to test their skills.</p>
            <dl><app-button class="info" disabled=true>Comming soon</app-button></dl>
          </div>
          <img :src="require('!file-loader!@/assets/icons/challenge.svg')"/>
        </div>
      </div>
      <div class="white-section">
        <div>
          <h1>Create and share</h1>
          <p>There are abundant game assets and animations to help you to unleash your creativity. Save and reuse your own puppets. Share your creations to your friends and family.</p>
          <div class="status-info">
            <div class="status-wrapper">
              <span class="home-status-counter">{{numPuppets}}</span>
              <div class="status-label">Puppets</div>
            </div>
            <div class="status-wrapper">
              <span class="home-status-counter">{{numCreations}}</span>
              <div class="status-label">Creations</div>
            </div>
          </div>
        </div>
        <svg>
          <use :xlink:href="`#${CreateAndShareIcon.id}`" :viewBox="CreateAndShareIcon.viewBox"/>
        </svg>
      </div>
      <div class="banner curriculum-section">
        <div class="banner-wrapper">
          <div class="banner-text">
            <h1>Curriculum for teachers and parents</h1>
            <p>Ready to use curriculum activities allow teachers and parents to engage with children in many different subjects other than programming. Feel free to modify the activities to suit your own needs.</p>
            <dl><app-button class="info" disabled=true>Comming soon</app-button></dl>
          </div>
          <img :src="require('!file-loader!@/assets/icons/curriculum.svg')"/>
        </div>
      </div>
      <div class="white-section">
        <div>
          <h1>Special needs in mind</h1>
          <p>Puppet & Brain curriculum activities support a variety of switch access devices and methods so everybody can learn.</p>
        </div>
        <svg>
          <use :xlink:href="`#${SpecialNeedsIcon.id}`" :viewBox="SpecialNeedsIcon.viewBox"/>
        </svg>
      </div>
      <div class="banner guru-section">
        <div class="guru-banner-wrapper">
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
                <p>An intuitively execuiton and data flow visualization helps you reasoning the program and reinforce your logic thinking.</p>
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
import SplashVideoIcon from '@/assets/icons/splash-video.svg'


export default {
  data() {
    return {
      numCreations: 0,
      numPuppets: 0,
      CreateAndShareIcon,
      SpecialNeedsIcon,
      SplashVideoIcon,
      // splashImageUrl: `url(${require('!file-loader!@/assets/icons/splashbg.svg')})`
    }
  },
  components: {
    'app-footer': Footer
  },
  mounted() {
    this.clearActiviyOnSnapshot = firebase.firestore().collection('status').doc('activities').onSnapshot(snapshot => {
      this.numCreations = snapshot.data().total;
    })
    this.clearPuppetOnSnapshot = firebase.firestore().collection('status').doc('puppets').onSnapshot(snapshot => {
      this.numPuppets = snapshot.data().total;
    })
  },
  beforeDestroy() {
    this.clearActiviyOnSnapshot();
    this.clearPuppetOnSnapshot();
  }
}
</script>

<style lang="scss" scoped>
#home {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;

  transition: opacity ease 0.3s;

  padding-top: 56px;
  
  .start-button {
    display: block;
    background-color: #333333;
  }

  .home-container {
    width: 100%;
    background-color: #E6E6E6;
  }

  .splash {
    position: relative;
    z-index: 1;
    
    width: 100%;
    background-color: #167DA8;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

    .splash-bg {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 90rem;
      height: 100%;

      // bg images
      background-repeat: no-repeat;
      background-position: -40% 0%;
      background-size: cover;
    }

    .splash-content {
      position: relative;
      padding: 10px;
      margin: 0 auto;
      max-width: 75rem;

      padding: 60px 0;

      img {
        position: relative;
        z-index: 1;
        width: 100%;
        // remove the white space below img
        display: inline-block;

        user-select: none;
      }

      // .splash-logo {
      //   width: 55%;
      //   display: inline-block;
      //   background-color: white;

      //   padding: 10px;
      //   border-radius: 10px;
      // }

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

  .home-content {
    background-color: #FAFAFA;
    margin: auto;

    max-width: 75rem;

    display: flex;
    flex-direction: column;

    padding-bottom: 80px;

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

      display:flex;
      justify-content: space-between;
      flex-direction: row;
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
    padding: 80px 20px;

    overflow: hidden;
    
    p {
      margin: 20px auto 0 auto;
      width: 60%;
    }

    svg {
      position: absolute;
      top: 50%;
      
      transform-origin: 0 0;
      transform: scale(2) translate(-50%, -50%);
    }
  }

  .tutorial-section {
    text-align: left;
    padding: 60px 20px;
    p {
      text-align: left;
      margin: 20px 0 20px 0;
      width: 70%;
    }
    .tutorial-section-wrapper {
      margin: 0 60px;

      display: flex;
      flex-direction: row;
      justify-content: space-between;

      img {
        width: 160px;
        height: 160px;
      }
    }
  }

  

  .status-info {
    margin-top: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .status-wrapper {
    margin: 10px;
  }

  .home-status-counter {
    font-family: "jaf-domus", Arial, Helvetica, sans-serif;
    font-size: 1.3em;
    font-weight: 600;
  }

  .status-label {
    margin-top: 10px;
    font-size: 0.9em;
    color: rgb(145, 145, 145);
  }


  .challenge-section {
    background-color: #F2881E;
    border-radius: 10px;

    opacity: 0.6;
  }

  .curriculum-section {
    background-color: #CCBD19;
    border-radius: 10px;

    opacity: 0.6;
  }

  .guru-section {
    background-color: #4B3FA5;
    border-radius: 10px;

    .guru-banner-wrapper {
      margin: 60px 80px;
    }

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

.home-leave-active {
  opacity: 0;
}

.home-enter {
  opacity: 0;
}

@media screen and (max-width: 950px) {
  #home {
    .splash {
      .splash-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        iframe {
          width: 100%;
        }

        .splash-text {
          margin-top: 40px;
          width: 80%;
          float: none;
        }
      }
    }

    .banner {
      .banner-wrapper {
        img {
          display: none;
        }

        .banner-text {
          width: 90%;
        }
      }
    }

    .white-section {
      padding: 40px 20px;

      overflow: hidden;
      
      p {
        margin: 20px auto 20px auto;
        width: 100%;
      }
    }

    .tutorial-section-wrapper {
      img {
        display: none;
      }
    }

    .guru-section {
      .guru-banner-wrapper {
        margin: 60px 60px;
      }
    }

    .guru-content {
      display: block;
      

      .sub-section {
        margin-top: 40px;
        width: 100%;
      }
    }
  }
}

</style>
