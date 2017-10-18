import * as commands from './'

export function deserialize(str) {
  let className = null;
  let data = JSON.parse(str, (k, v) => {
    if(k === 'constructor') {
      className = v;
      return undefined
    }
    if(k === 'id') return undefined;
    return v;
  });

  let cmd = new commands[className]();
  return Object.assign(cmd, data);
}

export async function chain(cmds) {
  var results = [];
  await cmds.reduce(async (promise, cmd, index) => {
    await promise;
    results.push(await cmd.run());
  }, Promise.resolve());
  return results;
}