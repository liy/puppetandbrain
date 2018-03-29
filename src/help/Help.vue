<template>
<div class="help-container">
  <div v-for="(value, key) in groups" :key="key" class="group" :class="key.toLowerCase()">
    <!-- test -->
    <vue-block v-for="template in value" :template="template" :key="template.className"/>
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
  components: {
    'vue-block': Block,
    'block-doc': BlockDoc,
  },
  data() {
    return {
      groups
    };
  },
  name: "help",
}

</script>

<style lang="scss" scoped>
.help-container {
  // display: grid;
  // grid-template-columns: repeat(4, 1fr);
  // grid-row-gap: 30px;
  // grid-column-gap: 30px;
}

.group {
  margin: 10px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 30px;
  grid-column-gap: 30px;

  border-radius: 15px;

  background-color: #3b3e4d;
}
</style>
