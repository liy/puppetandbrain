export default class TaskWalker
{
  static pod(entryTasks) {

    let result = {
      tasks: {},
      entries: []
    }

    // get all entries
    for(let key in entryTasks) {
      let entryTask = entryTasks[key]
      result.entries.push(entryTask.id);

      // traverse every entry
      TaskWalker.walk(entryTask, result);
    }

    return result;
  }

  static walk(task, result) {
    result.tasks[task.id] = task.pod();

    for(let exec of task.execution.options) {
      if(exec.task) TaskWalker.walk(exec.task, result)
    }
  }
}