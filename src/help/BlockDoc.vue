<template>
<transition name='blockDoc'>
<div v-if="help && blockDocTemplate" class="block-doc">
  <div @click="close" class="doc-underlay"/>
  <div class="doc-card">
    <div @click="close" class="close-button">x</div>
    <div v-if="doc" class="block-doc-info">
      <div class="block-doc-container">
        <vue-block :template="blockDocTemplate"/>
      </div>
      <div class="block-doc-metadata">
        <!-- executions -->
        <div class="metadata-section execution" v-if="doc.e.length!=0">
          <h5>executions</h5>
          <div class="metadata-field" v-for="execution in doc.e" :key="execution.name">
            <div class="name">{{execution.n}}</div>
            <div class="description">{{execution.d}}</div>
          </div>
        </div>
        <!-- inputs -->
        <div class="metadata-section input" v-if="doc.i.length!=0">
          <h5>inputs</h5>
          <div class="metadata-field" v-for="input in doc.i" :key="input.name">
            <div class="name">{{input.n}}</div>
            <div class="description">{{input.d}}</div>
          </div>
        </div>
        <!-- outputs -->
        <div class="metadata-section output" v-if="doc.o.length!=0">
          <h5>outputs</h5>
          <div class="metadata-field" v-for="output in doc.o" :key="output.name">
            <div class="name">{{output.n}}</div>
            <div class="description">{{output.d}}</div>
          </div>
        </div>

        <!-- operations -->
        <div class="metadata-section operation" v-if="doc.ops && doc.ops.length!=0">
          <h5>operations</h5>
          <div class="metadata-field" v-for="operation in doc.ops" :key="operation.name">
            <div class="name">{{operation.n}}</div>
            <div class="description">{{operation.d}}</div>
          </div>
        </div>
      </div>
    </div>
      <!-- description -->
    <p v-if="doc" class="doc-description">{{doc.d}}</p>
    <!-- tips -->
    <p v-if="doc && doc.tip" class="doc-tip">{{doc.tip}}</p>
    <p v-if="!doc">Sorry, this block documentation is not available. I'm still working on it...</p>
  </div>
</div>
</transition>
</template>

<script>
import {mapGetters} from 'vuex'
import Block from '@/help/Block.vue'
import API from '@/API';

export default {
  components: {
    'vue-block': Block,
  },
  data() {
    return {
      help: null
    }
  },
  computed: {
    ...mapGetters(['blockDocTemplate']),
    doc() {
      // use either name or class name(useful in adpator type node)
      return (this.help[this.blockDocTemplate.name] || this.help[this.blockDocTemplate.className]) || null
    }
  },
  beforeCreate() {
    API.getDocumentation().then(data => {
      this.help = data;
    })
  },
  methods: {
    close() {
      this.$store.commit('closeBlockDoc');
    }
  }
}
</script>

<style lang="scss" scoped>
.doc-underlay {
  position: absolute;
  width: 100%;
  height: 100%;

  z-index: -1;

  background-color: #fffffff2;
}

.block-doc {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  z-index: 11;
  
  transition: opacity ease 0.3s;
}

.doc-card {
  position: relative;
  width: 60%;
  background: #2c2b33;
  border-radius: 15px;

  font-size: 18px;
  color: rgb(255, 255, 255);

  // margin: 50px auto;
  padding: 50px;

  .close-button {
    position: absolute;
    top: 20px;
    left: 20px;
    min-width: 32px;
    min-height: 32px;
    text-align: center;
    line-height: 32px;

    cursor: pointer;
  }

  .block-doc-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .block-doc-container {
    padding: 20px 80px 20px 0px;
  }

  .metadata-section {
    margin-top: 20px;
  }
  .metadata-section:first-child {
    margin-top: 0;
  }

  .metadata-field {
    padding: 10px 0;
    
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
  }

  h5 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #b3b3b3;
    font-size: 0.8em;
  }

  .name {
    font-weight: 600;
    min-width: 150px;
  }

  .description {
    width: 80%;

    font-size: 0.9em;
    line-height: 1.5em;
  }

  .doc-description {
    display: inline-block;
    margin-top: 40px;
    
    font-size: 0.9em;
  }

  .doc-tip {
    font-size: 0.8em;
    color:rgb(173, 173, 173);
  }

  .doc-tip:before {
    content: "Tips: ";
    font-weight: bold;
    font-size: 0.9em;
  }
}


@media screen and (max-width: 1000px) {
  .doc-card {
    .metadata-field {
      flex-direction: column;
    }
    .description {
      width: 100%;
      margin-top: 10px;
    }
  }
}

@media screen and (max-width: 700px) , screen and (max-height: 500px){
  .block-doc {
    display: block;
  }

  .doc-card {
    width: 100%;
    min-height: 100%;
    border-radius: 0;

    padding: 0;

    .block-doc-info {
      align-items: normal;
      flex-direction: column;
      margin: 0 20px;
    }

    .metadata-field {
      flex-direction: column;
    }
    
    .description {
      width: 100%;
      margin-top: 10px;
    }

    .doc-description {
      margin: 20px;
    }
  }
}


.blockDoc-leave-active {
  opacity: 0;
}

.blockDoc-enter {
  opacity: 0;
}
</style>
