export default class EventEmitter 
{
  constructor() {
    this.listeners = Object.create(null);
  }

  /**
   * [on description]
   * @param {[type]} type       [description]
   * @param {[type]} listener   [description]
   */
  on(type, fn, context=fn){
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push({
      fn,
      context
    });
  }

  has(type){
    return this.listeners[type];
  }

  off(type, fn, context=fn){
    var typedListeners = this.listeners[type];

    if (typedListeners)
    {
      for(let i=typedListeners.length-1; i>=0; --i) {
        let listener = typedListeners[i];
        // Note that, I also check the wrapped function in order to remove "once" listener
        if((listener.fn === fn && listener.context === context) || listener.once == fn) {
          typedListeners.splice(i, 1);
        }
      }
    }
  }

  once(type, fn, context=fn) {
    this.listeners[type] = this.listeners[type] || [];

    let wrapper = (data, type) => {
      fn.call(context, data, type);
      this.off(type, wrapper, context);
    }
    this.listeners[type].push({
      fn: wrapper,
      //
      once: fn,
      context
    });
  }

  removeAllListeners() {
    this.listeners = Object.create(null);
  }

  /**
   * Dispatch event with corresponding type, and add custom properties for
   * the event object being sent.
   * @param  {Object} type  The type of the event.
   * @param  {Object} data  You can add extra custom properties into the event object using the object ma
   */
  emit(type, data) {
    let listeners = this.listeners[type];
    if(listeners){
      // Avoid looping issues when listener is removed during the dispatching process.
      listeners = listeners.concat();
      // for(let i=0; i<listeners.length; ++i) {
      for(let listener of listeners) {
        // note that every listener gets a complete new event object instance. Just in case they modified the event 
        // during event dispatching
        listener.fn.call(listener.context, data, type);
      }
    }
  }
}




