<template>
<div class="creation-list">
  <div class="activities-scroll">
    <router-link v-for="creation in creations" :to="`/editor/${creation.activityID}`" :key="creation.activityID">
      <img :src="creation.url"/>
    </router-link>
  </div>
</div>
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
    this.creations = (await API.recentActivities()).filter(v => {
      return v != null;
    });
  }
}
</script>

<style lang="scss" scoped>
.creation-list {
  margin: auto;
  // nav bar
  padding: 60px 0;
}
.activities-scroll {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 2px;
  grid-column-gap: 2px;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  cursor: pointer;
}

img:hover {
  opacity: 1;
}
</style>
