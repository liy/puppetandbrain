const state = {
  debugMode: false,
  editorMode: 'stage'
}

const getters = {
  debugMode: state => state.debugMode,
  editorMode: state => state.editorMode,
}

const mutations = {
  // change modes:
  updateDebugMode(state, mode) {
    state.debugMode = mode;
  },

  toggleDebugMode() {
    state.debugMode = !state.debugMode;
  },

  authStateChange(state, user) {
    state.user = user;
  },
}

export default {
  state,
  getters,
  mutations
}
