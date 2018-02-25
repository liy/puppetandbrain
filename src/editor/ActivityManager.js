import Activity from "./Activity";

class ActivityManager {
  constructor() {
    this.current = new Activity();
  }
}

export default new ActivityManager();