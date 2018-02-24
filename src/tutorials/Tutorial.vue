<template>
<editor></editor>
</template>

<script>
import Editor from '@/editor/Editor.vue';

export default {
  name: 'tutorial',
  components: {
    'editor': Editor,
  },
  async mounted() {
    
    let tutorialName = this.$route.params.tutorialName;
    if(tutorialName) {
      this.tutorial = (await import(`@/tutorials/${tutorialName}`)).default;
      this.tutorial.start();
    }
  },
  beforeDestroy() {
    this.tutorial.destroy()
  }
}
</script>