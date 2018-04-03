const state = {
  debugMode: false,
  stageMode: true,
  propertyPanelVisable: false,
  tutorialMode: false,
  browserVisible: false,
  shareMenuVisible: false,

  blockDocTemplate: null,

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
  shareMenuVisible: state => state.shareMenuVisible,

  actors: state => state.actors,
  
  historyLock: state => state.historyLock,
  saveLock: state => state.saveLock,
  modeLock: state => state.modeLock,
  debugLock: state => state.debugLock,
  addLock: state => state.addLock,
  deleteLock: state => state.deleteLock,

  blockDocTemplate: state => state.blockDocTemplate,
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

  updateShareMenuVisible(state, visible) {
    state.shareMenuVisible = visible;
  },

  lock(state, data) {
    state[data.target] = data.locked;
  },

  setActors(state, actors) {
    state.actors = actors;
  },

  openBlockDoc(state, template) {
    state.blockDocTemplate = template;
  },

  closeBlockDoc(state) {
    state.blockDocTemplate = null;
  }
}

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
}
