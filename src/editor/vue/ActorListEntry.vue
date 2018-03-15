<template>
<div class='actor-list-entry-icon' :class="{sortDisabled: !sortEnabled}" :style="{backgroundImage: `url(${url})`}"></div>
</template>

<script>
export default {
  name: 'actor-list-entry',
  props: ['actorID', 'sortEnabled'],
  data() {
    return {
      url: null
    }
  },
  computed: {
    actor() {
      return Hub.activity.lookUp.get(this.actorID)
    }
  },
  created() {
    console.log(this.sortEnabled)
    this.setUrl();
  },
  methods: {
    setUrl() {
      if(this.actor.puppetID) {
        API.getUrl(`${this.actor.libDir}/${this.actor.puppetID}/snapshot.png`).then(url => {
          this.url = url;
        })
      }
      // canvas
      else {
        this.url = require('!file-loader!@/assets/icons/canvas.svg')
      }
      console.log(this.url)
    }
  }
}
</script>

<style lang="scss">
.actor-list-entry-icon {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  
  background-size: 70%;
  background-color: #f3e9ff;
  background-repeat: no-repeat; 
  background-position: center center;

  pointer-events: none;
}

.actor-list-entry-icon.sortDisabled {
  background-color: #ececec;
}
</style>
