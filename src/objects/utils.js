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