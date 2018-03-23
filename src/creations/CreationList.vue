<template>
<div></div>
</template>

<script>
import '@/API';

export default {
  name: 'creations',
  data() {
    return {
      creations: []
    }
  },
  async beforeMount() {
    this.creations = await API.recentActivities();
    console.log(this.creations[0])
  }
}
</script>

<style lang="scss" scoped>

</style>
