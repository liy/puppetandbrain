<template>
<div class="help-container">
  <!-- test -->
  <doc-block v-for="pod in templates" :pod="pod" :key="pod.className"/>
</div>
</template>

<script>
import * as NodeClasses from '../editor/nodes';
import '../editor/NodeTemplate';
import DocBlock from './DocBlock.vue'

const templates = [];
Object.keys(NodeTemplate.all).map(className => {
  if(className != 'VariableGetter' && className != 'VariableSetter' && className != 'PropertyGetter' && className != 'PropertySetter' && 
      className != 'Perform' && className != 'Break') {
    templates.push(NodeTemplate.all[className])
  }
})

export default {
  components: {
    'doc-block': DocBlock 
  },
  data() {
    return {
      templates,
    };
  },
  name: "help",
}

</script>

<style lang="scss" scoped>
.help-container {
  
}
</style>
