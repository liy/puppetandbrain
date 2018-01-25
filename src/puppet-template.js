let puppet = {
  // all the puppets are originated from the library puppet,
  // this points to the original puppet doc
  // 
  // for accessing predefined spine files, etc.
  sourceID: "SYrH8lWcRl6VmBakJmo3",

  // when user click export actor, a new puppetID will be generated.
  //
  // 1. this is used for accessing snapshot file.
  // 2. and the user uploaded files used by this puppet
  puppetID: "6VmBacRlJmoYrH8lkSW3",
  
  // read only
  // list of files from sourceID folder, these files are defined by default, officially.
  manifest: [],


  // below are the normal game play pod object.
  
  // actor id used during game play
  actors: [123],
  stores: [{}]
}

/*

Cron job will scan this collection to decide which file to remove

uploads: {
  <puppetID 1>: {
    <file A ID>: <puppetID 1>
    <file B ID>: <puppetID 1>
  },
  <activityID 1>: {
    <file C ID>: <activityID 1>
  }
}
*/

let activity = {

}