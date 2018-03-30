<template>
<div class="help-container">
  <div>
    <h2>Click the block to view its detail help description.</h2>
  </div>
  <div v-for="(value, key) in groups" :key="key" class="help-group-section" :class="key.toLowerCase()">
    <span class="help-group-name">{{key}}</span>
    <div class="help-group-grid">
      <vue-block v-for="template in value" :template="template" :key="template.className" @click.native="openBlockDoc(template)"/>
    </div>
  </div>
  <block-doc/>

  <div class="help-group-section">
    <span class="help-group-name">Execution Pins</span>
    <div class="pin-section-content">
      <div class="help-icon-container">
        <div class="execution-pin-doc-icon"><svg><use :xlink:href="`#${ExecutionInIcon.id}`" :viewBox="ExecutionInIcon.viewBox"/></svg><span class="pin-doc-icon-label">Execution enter pin</span></div>
        <div class="execution-pin-doc-icon"><svg><use :xlink:href="`#${ExecutionOutIcon.id}`" :viewBox="ExecutionOutIcon.viewBox"/></svg><span class="pin-doc-icon-label">Execution out(leave) pin</span></div>
      </div>
      <p>Execution pin represents the execution flow. You can connect an execution out pin to another execution enter pin to form an execution flow.</p>
      <p class="help-tip">Tip: execution enter pin can be connected to multiple execution out pins. This allow the block to be shared among other blocks.</p>
    </div>
  </div>

  <div class="help-group-section">
    <span class="help-group-name">Data Pins</span>
    <div class="pin-section-content">
      <div class="help-icon-container">
        
        <div class="data-pin-doc-icon">
          <div class="data-pin output-pin">
            <div class="data-head">
              <div class="data-symbol">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="34" height="38" class="data-svg" style="pointer-events: none; --fill:#98c6de;">
                  <use xlink:href="#output" id="output" viewBox="0 0 34 38"></use>
                </svg>
              </div>
            </div>
          </div>
          <span class="pin-doc-icon-label">Ouput pin</span>
        </div>
        
        <div class="data-pin-doc-icon">
          <div class="data-pin input-pin">
            <div class="data-head">
              <div class="data-symbol">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="34" height="38" class="data-svg" style="pointer-events: none;">
                  <use xlink:href="#input" id="input" viewBox="0 0 34 38"></use>
                </svg>
              </div>
            </div>
          </div>
          <span class="pin-doc-icon-label">Input pin</span>
        </div>
      </div>
      <p>Data pin represents the data flow. Connect ouput pin to input pin to pass the data to another block.</p>
      <p class="help-tip">Tip: one output pin can connect to multiple input pins, which means the output supply the data to multiple inputs.</p>
    </div>
  </div>
</div>
</template>

<script>
import * as NodeClasses from '../editor/nodes';
import '../editor/NodeTemplate';
import Block from './Block.vue'
import BlockDoc from './BlockDoc.vue'

import ExecutionInIcon from '@/assets/execution-in.svg';
import ExecutionOutIcon from '@/assets/execution-out.svg';
import InputIcon from '@/assets/input.svg';
import OutputIcon from '@/assets/output.svg';

const groups = {};
const templates = [];
Object.keys(NodeTemplate.all).map(className => {
  const template = NodeTemplate.all[className]
  if(className != 'VariableGetter' && className != 'VariableSetter' && className != 'PropertyGetter' && className != 'PropertySetter' && 
      className != 'Perform' && className != 'Break') {
    templates.push(template)
  }
})
templates.sort((a, b) => {
  return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
})
// groups
for(let template of templates) {
  groups[template.category] = groups[template.category] || [];
  groups[template.category].push(template);;
}

export default {
  name: "help",
  components: {
    'vue-block': Block,
    'block-doc': BlockDoc,
  },
  data() {
    return {
      groups,
      ExecutionInIcon,
      ExecutionOutIcon,
      InputIcon,
      OutputIcon,
    };
  },
  methods: {
    openBlockDoc(template) {
      this.$store.commit('openBlockDoc', template);
    }
  },
}

</script>

<style lang="scss" scoped>
.help-container {
  max-width: 1024px;
  // nav bar
  padding: 80px 0;

  margin: 0 auto;

  h2 {
    margin-bottom: 40px;
    text-align: center;
    color: #3b3e4d;
  }
}

.help-icon-container {
  margin-left: 30px;
}

.execution-pin-doc-icon {
  margin-top: 20px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    height: 32px;
    width: 65px;
    margin-right: 10px;
  }
}

.data-pin-doc-icon {
  margin-top: 20px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.data-pin {
  display: inline-block;

  $baseR: 61;
  $baseG: 85;
  $baseB: 102;
  $baseA: 0.85;
  $r: 80;
  $g: 112;
  $b: 134;
  $a: 0.6;

  background-color: rgba(($baseR + ($r - $baseR)*$a), 
    ($baseG + ($g - $baseG)*$a), 
    ($baseB + ($b - $baseB)*$a), 
    ($baseA + (1 - $baseA)*$a));

  margin-right: 10px;
}
  
.data-symbol {
  height: 38px;
}

.input-pin {
  border-radius: 19px 0 0 19px;
  
  box-shadow: -5px 0 8px -5px rgba(51, 51, 51, 0.4), 
    0 -5px 8px -5px rgba(51, 51, 51, 0.4), 
    0 5px 8px -5px rgba(51, 51, 51, 0.4);

  height: 38px;
  width: 34px;
}

.output-pin {
  border-radius: 0 19px 19px 0;

  box-shadow: 5px 0 8px -5px rgba(51, 51, 51, 0.4), 
    0 -5px 8px -5px rgba(51, 51, 51, 0.4), 
    0 5px 8px -5px rgba(51, 51, 51, 0.4);

  height: 38px;
  width: 34px;
}

.help-group-section {
  background-color: #3b3e4d;
  border-radius: 10px;
  margin-bottom: 50px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 30px;

  .help-tip {
    font-size: 0.8em;
    color:rgb(173, 173, 173);
  }
}

.pin-doc-icon-label {
  color: rgb(185, 185, 185);
  margin-right: 10px;
}

.help-group-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 30px;
  grid-column-gap: 30px;
}

.help-group-name {
  font-size: 12px;
  color: rgb(196, 196, 196);
  line-height: 50px;
}

.pin-section-content {
  margin-left: 40px;
  margin-right: 40px;

  p {
    color: white;
    margin-top: 40px;
  }
}

@media screen and (max-width: 600px) {
  .help-group-section {
    border-radius: 0;
  }

  .help-group-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
  }
}
</style>
