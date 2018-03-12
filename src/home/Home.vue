<template>
<transition name='home'>
<div id='home' ref='home'>
  <div class='home-content'>
    <div class='text-container'>
      <div class='wrapper'>
        <h4>PUPPET & BRAIN</h4>
        <h1>Make your puppets</h1>
        <h1>Create the story</h1>
        <h1>Learn coding</h1>
        <div class='home-action'>
          <app-button class='major' @click.native="toTutorial">Start learning</app-button>
          <!-- <app-button class='primary'>Sign Up</app-button> -->
        </div>
      </div>
    </div>

    <div class='example-container'>
      <div class='wrapper'>
        <img src="../assets/cat.gif"/>
        <div class='blocks-wrapper'>
          <div class="block listener"><div class="title">Game Event</div><div class="container"><div class="base">
            <div class="body" style="background-image: url(&quot;/ddc3a9ee35d96ae2255dc0bb1fb0d835.svg&quot;); background-repeat: no-repeat; background-position: center center;">
            <div class="content"><div class="left"></div><div class="right"><div class="execution-pin"><span class="label">start</span><div class="execution-symbol">
            <svg ref="outPin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="43" height="22" class="undefined">
          <use xlink:href="#execution-out" id="execution-out" viewBox="0 0 42.6 22"></use>  
          </svg></div></div><div class="execution-pin"><span class="label">stop</span><div class="execution-symbol"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="43" height="22" class="undefined">       
          <use xlink:href="#execution-out" id="execution-out" viewBox="0 0 42.6 22"></use>  
          </svg></div></div></div></div></div></div></div></div>

          <div class="block" style="transform: translate(240px, 0);"><div class="title">Animation</div><div class="container"><div class="base"><div class="body" style="background-image: url(&quot;/ddc3a9ee35d96ae2255dc0bb1fb0d835.svg&quot;); background-repeat: no-repeat; background-position: center center;"><div class="content"><div class="left"><div class="execution-pin"><span class="label"></span><div class="execution-symbol"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="43" height="22" class="undefined" style="--fill:#D0E400;">       
          <use xlink:href="#execution-in" id="execution-in" viewBox="0 0 42.6 22"></use>  
          </svg></div></div><div class="data-pin"><span class="label clickable">name</span><div class="data-head"><div class="data-symbol">
            <svg ref="inPin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="34" height="38" class="data-svg" style="pointer-events: none; --fill:none; --stroke:#b5ffeb;">       
          <use xlink:href="#input" id="input" viewBox="0 0 34 38"></use>  
          </svg></div><div class="gadget drop-down" style="display: none;"><select><option value="idle">idle</option><option value="run">run</option><option value="walk">walk</option></select></div></div></div></div><div class="right"><div class="execution-pin"><span class="label"></span><div class="execution-symbol"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="43" height="22" class="undefined">       
          <use xlink:href="#execution-out" id="execution-out" viewBox="0 0 42.6 22"></use>  
          </svg></div></div></div></div></div></div></div></div>
        </div>
      </div>
    </div>
  </div>
  <svg id="line-svg">
    <path :d="d" stroke="#d0e400" stroke-width="3"/>
  </svg>
  <app-footer/>
</div>
</transition>
</template>

<script>
import '@/editor/graph/blocks/color-theme.scss'
import '@/assets/execution-out.svg';
import '@/assets/execution-in.svg';
import '@/assets/input.svg';

import Footer from '@/vue/Footer.vue';

export default {
  data() {
    return {
      outPinPostion: {x:0,y:0},
      inPinPosition: {x:0,y:0}
    }
  },
  computed: {
    d() {
      return `M${this.outPinPostion.x},${this.outPinPostion.y} H${this.inPinPosition.x}`
    }
  },
  components: {
    'app-footer': Footer
  },
  methods: {
    toEditor() {
      document.getElementById('home').style.display = 'none';
      this.$router.push('editor')
    },
    toTutorial() {
      document.getElementById('home').style.display = 'none';
      this.$router.push('tutorials')
    },
    updateLine() {
      let offset = this.$refs.home.getBoundingClientRect();
      
      let rect = this.$refs.outPin.getBoundingClientRect();
      this.outPinPostion = {
        x: (rect.left + rect.right)/2 + 6.7,
        y: (rect.top + rect.bottom)/2 - offset.top
      }

      rect = this.$refs.inPin.getBoundingClientRect();
      this.inPinPosition = {
        x: (rect.left + rect.right)/2 - 1,
        y: (rect.top + rect.bottom)/2 - offset.top
      }
    }
  },
  mounted() {
    const connect = () => {
      this.updateLine();
      this.rafHandle = requestAnimationFrame(connect);
    }
    this.rafHandle = requestAnimationFrame(connect)
  },
  beforeDestroy() {
    cancelAnimationFrame(this.rafHandle)
  }
}
</script>

<style lang="scss" scoped>

#home {
  position: fixed;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  
  transition: opacity ease 0.3s;
}

.home-content {
  border-radius: 10px 10px 0 0;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;

  transform: translateY(-60px)
}

.text-container {
  width: 50%;
  min-height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: "jaf-domus-titling-web",sans-serif;
    font-size: 40px;
    margin: 0;
  }

  h4 {
    font-size: 30px;
    color: #6c80af;

    margin-bottom: 30px;
  }
  
  .home-action {
    margin-top: 50px;
  }
}



.example-container {
  width: 50%;

  .wrapper {
    width: 350px;
    height: 300px;

    img {
      display:block;
      margin: auto;
      margin-bottom: 20px;
    }
  }
}

#line-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  pointer-events: none;
}

@media screen and (max-height:750px){
  #home {
    position: relative;
    margin-top: 40px;
    margin-bottom: 40px;
  }
}

@media screen and (max-width: 600px) {
  .home-content {
    flex-direction: column;
  }

  .text-container {
    width: 100%;
    text-align: center;
  }
  .example-container {
    width: 100%;

    .wrapper {
      width: 400px;
      margin: auto;
      margin-top: 40px;
    }

    .blocks-wrapper {
      margin-left: 20px;
    }
  }
}

.home-leave-active {
  opacity: 0;
}

.home-enter {
  opacity: 0;
}


.block {
  user-select: none;
  position: absolute;
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;

  .title {
    text-align: center;
    font-size: 16px;
    color: white;

    // center
    width: 120px;
    margin-left: auto;
    margin-right: auto;

    margin-bottom: 3px;
  }

  .container {
    // min and max size
    min-width: 110px;
    min-height: 110px;

    // border is 3 pixels, so the raduis will be added 3 extra pixels
    border-radius: 13px;
    // retain the position when selected
    border: 3px solid rgba(0, 0, 0, 0);

    // auto fill available height
    display: flex;

    .base {
      border-radius: 10px;
      padding-bottom: 8px;
      
      // TODO: may be remove shaow?
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);

      // auto fill available height
      flex-grow: 1;
      display: flex;
      
      .body {
        border-radius: 10px;

        // fill available space
        flex-grow: 1;
        // make container to use flex so child can use flex-grow to fill the 
        // available space
        display: flex;
    
        .content {
          // Make sure all rows sits on top of the icon.
          position: relative;
          z-index: 1;

          padding-top: 10px;
          padding-bottom: 10px;

          // This make content(item) exapand to fill the available height
          // It is useful when manual set block body height
          flex-grow: 1;

          display: flex;
          // left and right item
          flex-direction: row;

          .left {
            flex-grow: 3;
            width: 70%;

            display: flex;
            flex-direction: column;
          }

          .right {
            flex-grow: 1;
            // width: 30%;
            margin-left: 6px;

            display: flex;
            flex-direction: column;
          }
        }

      }
    }
  }


  // TODO: maybe just use inline style?
  .data-symbol {
    height: 38px;

    cursor: pointer;
  }

  .execution-symbol {
    height: 22px;
    width: 43px;
  }

  .execution-pin:first-child {
    margin-top: 0;
  }

  .execution-pin {
    font-size: 12px;
    height: 38px;

    margin-top: 5px;

    // background-color: #ca7ec4ab;
    display: flex;

    .label {
      line-height: 38px;
    }

    .execution-symbol {
      position: absolute;
      margin-top: 8px;
    }
  }

  .left {
    .execution-pin {
      flex-direction: row;
      .label {
        margin-left: 10px;
      }
      .execution-symbol {
        left: -32px;
      }
    }
  }

  .right {
    .execution-pin {
      flex-direction: row-reverse;
      .execution-symbol {
        right: -35px;
      }
      .label {
        margin-right: 13px;
      }
    }
  }

  .data-pin:first-child {
  margin-top: 0;
}

.data-pin {
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  height: 38px;

  margin-top: 5px;

  // background-color: #ca7ec4ab;
  display: flex;

  .label {
      line-height: 38px;
      
      user-select: none;
      overflow-x: hidden;
      // do not wrap!!!
      // Otherwise when dragging block to the edge of the window
      // the content tends to wrap and change the whole block width!
      white-space: nowrap;
    }
  }

  .left {
    .data-pin {
      flex-direction: row;
      .label {
        margin-left: 10px;
      }
    }
  }

  .right {
    .data-pin {
      flex-direction: row-reverse;
      .label {
        margin-right: 13px;
      }
    }
  }

  .data-head {
    position: absolute;

    display: flex;
    // vertical centre fields in the content
    align-items: center;

    height: 38px;
    min-width: 34px;
  }

  .left {
    .data-head {
      right: 100%;
      // flex-direction: row-reverse;

      border-radius: 19px 0 0 19px;
      
      box-shadow: -5px 0 8px -5px rgba(51, 51, 51, 0.4), 
      0 -5px 8px -5px rgba(51, 51, 51, 0.4), 
      0 5px 8px -5px rgba(51, 51, 51, 0.4);
    }
  }

  .right {
    .data-head {
      left: 100%;
      // flex-direction: row;
      
      border-radius: 0 19px 19px 0;

      box-shadow: 5px 0 8px -5px rgba(51, 51, 51, 0.4), 
      0 -5px 8px -5px rgba(51, 51, 51, 0.4), 
      0 5px 8px -5px rgba(51, 51, 51, 0.4);
    }
  }
}

</style>
