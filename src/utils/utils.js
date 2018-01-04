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