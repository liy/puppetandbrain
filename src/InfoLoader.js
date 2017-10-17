export default class InfoLoader 
{
  static load(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      xhr.onload = function(){
        if(this.status === 200 || this.status === 201){
          resolve(JSON.parse(this.response));
        }
        else{
          reject(new Error(this.statusText));
        }
      };

      xhr.onerror = function(error){
        reject(error);
      };

      xhr.send();
    })
  }
}