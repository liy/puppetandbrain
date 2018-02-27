const state = {
  debugMode: false,
  stageMode: true,
  activity: null,
  propertyPanelVisable: false,
}

const getters = {
  debugMode: state => state.debugMode,
  stageMode: state => state.stageMode,
  activity: state => state.activity,
  propertyPanelVisable: state => state.propertyPanelVisable,
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
  },

  // note used for now
  togglePropertyPanel() {
    state.propertyPanelVisable = !state.propertyPanelVisable;
  },

  setPropertyPanelVisibility(state, visible) {
    state.propertyPanelVisable = visible;
    console.log(state.propertyPanelVisable)
  }
}

export default {
  state,
  getters,
  mutations
}
