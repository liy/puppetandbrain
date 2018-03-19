<template>
<div class='actor-list-entry-icon' :class="{sortDisabled: !sortEnabled, selected: selected, 'canvas-actor':this.isCanvasActor}" :style="{backgroundImage: `url(${url})`}"></div>
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
    },
    isCanvasActor() {
      return this.actor.className == 'CanvasActor'
    }
  },
  mounted() {
    ActorSelection.on('actor.selection.change', this.onSelectionChange, this);
  },
  beforeDestroy() {
    ActorSelection.off('actor.selection.change', this.onSelectionChange, this);
  },
  created() {
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
  background-color: #e7d3ff;
  background-repeat: no-repeat; 
  background-position: center center;

  opacity: 0.9;

  pointer-events: none;

  transform: scale(0.9);
  transition: opacity, background-color ease 0.3s;
  transition: all ease 0.2s;
}

.actor-list-entry-icon.sortDisabled {
  background-color: #ded9e4;
}

.actor-list-entry-icon.selected {
  background-color: #ae8dd6;
  opacity: 1;
  transform: scale(1);
}
</style>
