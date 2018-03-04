const state = {
  debugMode: false,
  stageMode: true,
  propertyPanelVisable: false,
  tutorialMode: false,
  browserVisible: false,
}

const getters = {
  debugMode: state => state.debugMode,
  stageMode: state => state.stageMode,
  activity: state => state.activity,
  propertyPanelVisable: state => state.propertyPanelVisable,
  tutorialMode: state => state.tutorialMode,
  browserVisible: state => state.browserVisible,
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

  // note used for now
  togglePropertyPanel() {
    state.propertyPanelVisable = !state.propertyPanelVisable;
  },

  setPropertyPanelVisibility(state, visible) {
    state.propertyPanelVisable = visible;
  },

  updateTutorialMode(state, mode) {
    state.tutorialMode = mode;
  },

  resetEditorState(state) {
    state.debugMode = false
    state.stageMode = true
    state.propertyPanelVisable = false
  },

  updateBrowserVisible(state, visible) {
    state.browserVisible = visible;
  },
}

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
}
