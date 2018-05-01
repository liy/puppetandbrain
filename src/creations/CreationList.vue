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
  // nav bar + 10px
  padding: 65px 10px;
}
.activities-scroll {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  border-radius: 10px;

  cursor: pointer;
}

img:hover {
  opacity: 1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.322);
}
</style>
