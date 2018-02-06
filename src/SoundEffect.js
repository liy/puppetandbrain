function loadSound(url) {
  return fetch(url).then(async response => {
    if(response.ok) {
      let blob = await response.blob();
      return URL.createObjectURL(blob);
    }
  })
}

export default {
  click: loadSound(require('./assets/sounds/click5.ogg')),
  snap: loadSound(require('./assets/sounds/snap.mp3')),
  link: loadSound(require('./assets/sounds/link.mp3')),
  'banner-click': loadSound(require('./assets/sounds/switch27.ogg')),

  play: async function(name) {
    let audio = new Audio(await this[name])
    audio.play().catch(err => {
      console.warn('Element removed causing sound effect gets unloaded?')
    })
  }
}