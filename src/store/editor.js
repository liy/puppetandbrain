const state = {
  debugMode: false,
  stageMode: true,
  propertyPanelVisable: false,
  tutorialMode: false,
  browserVisible: false,
  blockContextMenuVisible: false,

  actors: [],

  historyLock: true,
  saveLock: true,
  modeLock: true,
  debugLock: true,
  addLock: true,
  deleteLock: true,
}

const getters = {
  debugMode: state => state.debugMode,
  stageMode: state => state.stageMode,
  activity: state => state.activity,
  propertyPanelVisable: state => state.propertyPanelVisable,
  tutorialMode: state => state.tutorialMode,
  browserVisible: state => state.browserVisible,

  actors: state => state.actors,
  
  historyLock: state => state.historyLock,
  saveLock: state => state.saveLock,
  modeLock: state => state.modeLock,
  debugLock: state => state.debugLock,
  addLock: state => state.addLock,
  deleteLock: state => state.deleteLock,

  blockContextMenuVisible: state => state.blockContextMenuVisible,
}

const mutations = {
  // change modes:
  updateDebugMode(state, bool) {
    state.debugMode = bool;
  },

  toggleDebugMode() {
    state.debugMode = !state.debugMode;
  },

  updateStageMode(state, bool) {
    state.stageMode = bool;
  },

  toggleStageMode(state) {
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

  lock(state, data) {
    state[data.target] = data.locked;
  },

  setActors(state, actors) {
    state.actors = actors;
  },

  updateBlockContextMenuVisible(state, visible) {
    state.blockContextMenuVisible = visible;
  }
}

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
}
