const state = {
  debugMode: false,
  stageMode: true,
  activity: null,
}

const getters = {
  debugMode: state => state.debugMode,
  stageMode: state => state.stageMode,
  activity: state => state.activity,
}

const mutations = {
  // change modes:
  updateDebugMode(state, mode) {
    state.debugMode = mode;
  },

  toggleDebugMode() {
    state.debugMode = !state.debugMode;
  },

  updateStageMode(state, mode) {
    state.stageMode = mode;
  },

  toggleStageMode(state, mode) {
    state.stageMode = !stage.stageMode;
  },

  staging(state, activity) {
    state.activity = activity;
  }
}

export default {
  state,
  getters,
  mutations
}