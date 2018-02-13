import EventEmitter from '../utils/EventEmitter';
import DataType from './DataType';

export default class extends EventEmitter
{
  constructor(actor, pod) {
    super();

    this.actor = actor;

    this.propertyName = pod.propertyName;
    this.descriptor = {  
      // default user friendly name to be the property text
      friendlyName: pod.propertyName,
      ...pod.descriptor,
    };
    
    this.set(pod.data);
  }

  get type() {
    return this.descriptor.type;
  }

  /**
   * Set the authoring time data. Should be only used in
   * property authoring time update and activity loading
   * @param {*} data 
   */
  set(data) {
    // authoring time data
    this.data = data;

    // Invoke setter in actor
    this.actor[this.propertyName] = data;
  }

  updateRuntime() {
    this.runtime = JSON.parse(JSON.stringify(this.data));
  }

  // get data() {
  //   return this._data;
  // }

  // /**
  //  * Update the data only. NOT the initial data
  //  */
  // set data(v) {
  //   let old = this._data;
  //   this._data = v;
  //   this.emit('property.data.changed', {
  //     old,
  //     data: v
  //   })
  // }

  pod() {
    return JSON.parse(JSON.stringify(this.data || null));
  }
}