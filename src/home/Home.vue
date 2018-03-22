<template>
<transition name='home'>
<div id='home' ref='home'>
  <div></div>
</div>
</transition>
</template>

<script>
import Footer from '@/vue/Footer.vue';

export default {
  data() {
    return {
    }
  },
  components: {
    'app-footer': Footer
  }
}
</script>

<style lang="scss" scoped>
</style>
