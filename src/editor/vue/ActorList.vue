<template>
<!-- <div class='list-container' @wheel.prevent="scroll"> -->
<div class='list-container'>
  <ul class='actor-list' ref="list">
    <li v-for="actor in actors.concat().reverse()" :data-actor="actor.id" @click="click(actor)" :key="actor.id" :draggable="actor.sortEnabled"
      @touchstart="touchStart" @dragstart="dragStart" @touchmove="touchMove" @dragover="dragOver" @touchend="touchDragEnd" @dragend ="dragEnd" @dblclick="dbClick(actor)">
      <actor-list-entry :actorID="actor.id" :sortEnabled="actor.sortEnabled" class="actor-list-entry"></actor-list-entry>
    </li>
  </ul>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import ActorListEntry from './ActorListEntry.vue';
import {isMobile} from '@/utils/utils';
import Delay from '../access/Delay';
import ActorSelection from '../objects/ActorSelection';

const tapHold = new Delay()

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
    },
    selectedActor() {
      return ActorSelection.selected[0]
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
    selectActor(actor) {
      actor.select();
    },
    click(actor) {
      this.selectActor(actor);
    },
    dbClick(actor) {
      actor.openBrain();
    },
    dragStart(e) {
      this.dragTarget = e.target;
      this.dragTarget.classList.add('dragging')

      this.selectActor(Hub.activity.lookUp.get(this.dragTarget.dataset.actor))
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
    dragEnd(e) {
      this.dragTarget.classList.remove('dragging')
      this.dragTarget = null;
      this.dropTarget = null;
    },


    touchStart(e) {
      // stop dragging the screen
      if(this.selectedActor && (this.selectedActor.id == e.target.dataset.actor)) {
        e.preventDefault();

        if(e.target.getAttribute('draggable') == 'true') {
          this.dragTarget = e.target;
          this.dragTarget.classList.add('dragging')
        }
      }
      
      tapHold.wait(500).then(() => {
        const actor = Hub.activity.lookUp.get(e.target.dataset.actor)
        actor.openBrain();
      })
    },
    touchMove(e) {
      tapHold.cancel();

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
    touchDragEnd(e) {
      tapHold.cancel();

      if(!this.dragTarget) return;

      
      // this.selectActor(Hub.activity.lookUp.get(this.dragTarget.dataset.actor))

      this.dragEnd(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  position: absolute;
  top: 160px;
  left: 40px;

  --total-num: 3;
  height: calc(var(--total-num)*48px + var(--total-num)*4px + 4px);
  overflow-x: hidden;
  overflow-y: scroll;

  background-color: aqua;
  // clip-path: inset(0 0 round 28px 28px);
}

.actor-list {

  transition: all 0.3s ease;
}

@media screen and (max-width: 600px) {
  .actor-list {
    top: 120px;
    left: 30px;
  }
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
  // background-color: rgba(253, 253, 253, 0.8);
  border-radius: 28px;

  user-select: none;

  li {

    // background-color: aqua;
    
    // if actor list entry has size change animation
    // this size setting is useful to keep container outer size fixed
    width: 48px;
    height: 48px;
    
    margin-top: 4px;
    margin-left: 4px;
    cursor: pointer;
  }

  li:last-child {
    margin-bottom: 4px;
  }

  opacity: 1;
  transition: opacity 0.3s ease;
}

ul:empty {
  opacity: 0;
}

</style>
