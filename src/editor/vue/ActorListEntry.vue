<template>
<div class='actor-list-entry-icon' :class="{sortDisabled: !sortEnabled, selected: selected}" :style="{backgroundImage: `url(${url})`}"></div>
</template>

<script>
import ActorSelection from '../objects/ActorSelection'

export default {
  name: 'actor-list-entry',
  props: ['actorID', 'sortEnabled'],
  data() {
    return {
      url: null,
      selected: false
    }
  },
  computed: {
    actor() {
      return Hub.activity.lookUp.get(this.actorID)
    }
  },
  mounted() {
    ActorSelection.on('actor.selection.change', this.onSelectionChange, this);
  },
  beforeDestroy() {
    ActorSelection.off('actor.selection.change', this.onSelectionChange, this);
  },
  created() {
    console.log(this.sortEnabled)
    this.setUrl();
  },
  methods: {
    onSelectionChange(actors) {
      this.selected = actors[0] && (actors[0].id == this.actorID)
    },
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
.actor-list-entry-icon.selected {
  background-color: #ae8dd6;
}
</style>
