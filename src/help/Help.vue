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
</div>
</template>

<script>
import * as NodeClasses from '../editor/nodes';
import '../editor/NodeTemplate';
import Block from './Block.vue'
import BlockDoc from './BlockDoc.vue'

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
      groups
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

.help-group-section {
  background-color: #3b3e4d;
  border-radius: 10px;
  margin-bottom: 50px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 30px;
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
