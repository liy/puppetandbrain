<template>
<div id="side-bar">
  <ul ref="list">
    <li v-for="actor in actors.concat().reverse()" :data-actor="actor.id" @click="select(actor)" :key="actor.id" :draggable="actor.sortEnabled" 
      @touchstart="touchDragStart" @dragstart="dragStart" @touchmove="touchMove" @dragover="dragOver" @touchend="touchDragEnd" @dragend ="dragEnd" @dblclick="dbClick(actor)">
      <actor-list-entry :actorID="actor.id" :sortEnabled="actor.sortEnabled" class="actor-list-entry"></actor-list-entry>
    </li>
  </ul>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import ActorListEntry from './ActorListEntry.vue';

export default {
  name: 'actor-list',
  components: {
    'actor-list-entry': ActorListEntry,
  },
  data() { 
    return {
      dragTarget: null,
      dropTarget: null,
    }
  },
  computed: {
    actors: {
      get() {
        return this.$store.state.actors
      },
      set(value) {
        this.$store.commit('setActors', value)
      }
    }
  },
  methods: {
    getSnapshotUrl(actor) {
      return API.getUrl(`${actor.libDir}/${actor.puppetID}/snapshot.png`)
    },
    sort() {
      const elements = this.$refs.list.children;
      const sortedActors = [];
      for(let elm of elements) {
        sortedActors.push(Hub.activity.lookUp.get(elm.dataset.actor));
      }
      sortedActors.reverse();
      this.$store.commit('setActors', sortedActors);
      Hub.stage.sort(sortedActors)
    },
    select(actor) {
      actor.select();
    },
    dbClick(actor) {
      console.log(actor)
      actor.openBrain();
    },
    dragStart(e) {
      this.dragTarget = e.target;
      this.dragTarget.classList.add('dragging')
    },
    touchDragStart(e) {
      // stop dragging the screen
      e.preventDefault();
      if(e.target.getAttribute('draggable') == 'true') {
        this.select(Hub.activity.lookUp.get(e.target.dataset.actor))
        this.dragStart(e)
      }
    },
    dragOver(e) {
      // e.preventDefault();
      if(!Hub.activity.lookUp.get(e.target.dataset.actor).sortEnabled) return;

      this.dropTarget = e.target;

      const rect = this.dropTarget.getBoundingClientRect();
      const beforeDropTarget = (e.clientY - rect.bottom)/(rect.top - rect.bottom) > 0.5;
      e.target.parentNode.insertBefore(this.dragTarget, beforeDropTarget ? this.dropTarget : this.dropTarget.nextSibling);

      this.sort();
    },
    touchMove(e) {
      if(!this.dragTarget) return;

      let x = e.changedTouches[0].clientX;
      let y = e.changedTouches[0].clientY;
      let target = document.elementFromPoint(x, y);

      if(target.getAttribute('draggable') == 'true' && target != this.dragTarget) {
        this.dropTarget = target;

        const rect = this.dropTarget.getBoundingClientRect();
        const beforeDropTarget = (y - rect.bottom)/(rect.top - rect.bottom) > 0.5;
        this.dropTarget.parentNode.insertBefore(this.dragTarget, beforeDropTarget ? this.dropTarget : this.dropTarget.nextSibling);

        this.sort();
      }
    },
    dragEnd(e) {
      this.dragTarget.classList.remove('dragging')
      this.dragTarget = null;
      this.dropTarget = null;
    },
    touchDragEnd(e) {
      if(!this.dragTarget) return;
      
      this.dragEnd(e);
    }
  }
}
</script>

<style lang="scss" scoped>
#side-bar {
  position: absolute;
  width: 120px;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dragging {
  opacity: 0.5;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;

  width: 56px;
  min-height: 56px;
  // background-color: rgba(226, 223, 242, 0.8);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 28px;

  user-select: none;

  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;

  li {
    margin-top: 4px;
    margin-left: 4px;
    cursor: pointer;
  }

  li:last-child {
    margin-bottom: 4px;
  }
}
</style>
