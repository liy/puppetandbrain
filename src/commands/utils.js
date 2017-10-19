export async function chain(cmds) {
  var results = [];
  await cmds.reduce(async (promise, cmd, index) => {
    await promise;
    results.push(await cmd.run());
  }, Promise.resolve());
  return results;
}