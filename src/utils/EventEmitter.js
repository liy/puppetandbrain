export default class EventEmitter 
{
  constructor() {
    this.listenerTypes = Object.create(null);
  }

  /**
   * [on description]
   * @param {[type]} type       [description]
   * @param {[type]} listener   [description]
   */
  on(type, listener){
    this.listenerTypes[type] = this.listenerTypes[type] || [];
    this.listenerTypes[type].push(listener);
  }

  has(type){
    return this.listenerTypes[type];
  }

  off(type, listener){
    var listeners = this.listenerTypes[type];

    if (listeners)
    {
      var len = listeners.length;
      var index = listeners.indexOf(listener);
      if (index !== -1)
      {
        listeners.splice(index, 1);
      }
    }
  }

  once(type, listener) {
    this.listenerTypes[type] = this.listenerTypes[type] || [];
    let wrapper = (e) => {
      listener(e);
      this.off(type, wrapper);
    }
    this.listenerTypes[type].push(wrapper);
  }

  clear() {
    this.listenerTypes = Object.create(null);
  }

  /**
   * Dispatch event with corresponding type, and add custom properties for
   * the event object being sent.
   * @param  {Object} type  The type of the event.
   * @param  {Object} data  You can add extra custom properties into the event object using the object ma
   */
  emit(type, data) {
    let listeners = this.listenerTypes[type];
    if(listeners){
      // Avoid looping issues when listener is removed during the dispatching process.
      listeners = listeners.concat();
      for(let i=0; i<listeners.length; ++i) {
        // note that every listener gets a complete new event object instance. Just in case they modified the event 
        // during event dispatching
        listeners[i](data, type);
      }
    }
  }
}




