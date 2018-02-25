const state = {
  debugMode: false,
  editorMode: 'stage'
}

const getters = {
  debugMode: state => state.debugMode
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

  }
}

export default {
  state,
  getters,
  mutations
}