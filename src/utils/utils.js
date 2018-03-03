// export default {
//   isMobile: 
//   toRadian: Math.PI/180,
//   toDegree:  180/Math.PI,
//   
// }



export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const toRadian = Math.PI/180;

export const toDegree = 180/Math.PI;

export function svgElement(iconData, options={}) {
  let html = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${options.width}" height="${options.height}" class="${options.className}">       
    <use xlink:href="#${iconData.id}" id="${iconData.id}" viewBox="${iconData.viewBox}"/>  
  </svg>`

  return new DOMParser().parseFromString(html, "image/svg+xml").rootElement;
}

export function nextFrame() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

export const ContentType = {
  JSON: 'application/json',
  ATLAS: 'text/plain',
  PNG: 'image/png',
  JPG: 'image/jpg',
  OGG: 'audio/ogg',
  MP3: 'audio/mpeg',
  WAV: 'audio/wav',
  FLAC: 'audio/flac',
  GIF: 'image/gif',
}


const MIME = {
  'mp3': 'audio/mpeg',
  'json': 'application/json',
  'atlas': 'text/plain',
  'png': 'image/png',
  'jpg': 'image/jpg',
  'ogg': 'audio/ogg',
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'flac': 'audio/flac',
  'svg': 'image/svg+xml',
  'gif': 'image/gif'
}
export function getMimeType(ext) {
  return MIME[ext];
}

export function aroundAt(v, range=10) {
  return v + Math.random()*range*2-range;
}

export function everyframe(callback) {
  let id = 0;
  const handler = {
    cancel: function() {
      cancelAnimationFrame(id);
    }
  };

  (function loop() {
    callback();
    id = requestAnimationFrame(loop);
  })();

  return handler;
}

export function numericVector(data) {
  data.x = Number(data.x);
  data.y = Number(data.y);
  return data;
}

export function sharePopup(url, w=550, h=260) {
  // window.screenX, window.screenY handles multiple monitor setup...
  const x = window.screenX + (window.innerWidth-w)/2
  const y = window.screenY + (window.innerHeight-h)/2
  window.open(url, 'popup', `width=${w},height=${h},left=${x}px,top=${y}px`);
}