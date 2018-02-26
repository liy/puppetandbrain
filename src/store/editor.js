const state = {
  debugMode: false,
  editorMode: 'stage',
  activity: null,
}

const getters = {
  debugMode: state => state.debugMode,
  editorMode: state => state.editorMode,
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

  updateEditorMode(state, mode) {
    state.editorMode = mode;
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
