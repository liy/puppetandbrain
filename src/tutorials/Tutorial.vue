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
    // wait until hub is installed
    await Hub.installed;

    // TODO: mark the created activity to be tutorial
    // so I can prevent user to save it.
    //
    // create an activity to hold the tutorial data.
    Hub.create();

    let tutorialName = this.$route.params.tutorialName;
    if(tutorialName) {
      this.tutorial = (await import(`@/tutorials/${tutorialName}`)).default;
      await this.tutorial.init();
      this.tutorial.start();
    }
  },
  beforeDestroy() {
    this.tutorial.destroy()
  }
}
</script>