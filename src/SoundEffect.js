// FIXME: find a better way to handle sound effect preloading and playing
export default {
  click: new Audio(require(`./assets/sounds/click5.mp3`)),
  snap: new Audio(require(`./assets/sounds/snap.mp3`)),
  link: new Audio(require(`./assets/sounds/link.mp3`)),
  'banner-click': new Audio(require(`./assets/sounds/switch27.mp3`)),
  'trash': new Audio(require(`./assets/sounds/cardShove1.mp3`)),

  play: async function(name) {
    let audio = this[name];
    audio.currentTime = 0;
    audio.play().catch(err => {
      console.warn('Element removed causing sound effect gets unloaded?')
    })
  }
}