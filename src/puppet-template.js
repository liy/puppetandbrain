let puppet = {
  // all the puppets are originated from the library puppet,
  // this points to the original puppet doc
  // 
  // for accessing predefined spine files, etc.
  sourceID: "SYrH8lWcRl6VmBakJmo3",
  
  // read only
  // list of files from sourceID folder, these files are defined by default, officially.
  manifest: [],



  


  // When puppet is brought from the browser onto the stage, a new puppetID will be generated
  // This ID is for:
  //
  // 1. access user uploads
  // 2. if user decide to export it to MyPuppet, it will points to snaphost file
  //
  // When talking about the user uploads list, you only need to update the uploads list on the server when:
  //
  // 1. Save the activity
  // 2. Export to MyPuppet
  // 3. Of course, uploading a new file
  //
  // The ID should be server time based, plus a random number part.
  // I'm planning to combine the userID to prevent id collision attack.
  // The userID is dynamically appended during uploads list accessing. 
  // (could do it better hash it into a single id)
  //
  // This will ensure the uniqueness across the global:
  // https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html
  //
  //
  // Note that, anything dynamically spawned during the game play will not change this puppetID, and therefore
  // no new upload list needs to be generated
  puppetID: "6VmBacRlJmoYrH8lkSW3",

  // duplication of the root uploads for this puppet.
  // useful when loading the puppets, so we don't need to send extra request to
  // fetch the list of user uploads
  uploads: [],


  // below are the normal game play pod object.
  
  // actor id used during game play
  actors: [123],
  stores: {
    123: {
      className: "SpineActor"
    }
  }
}

/*

Cron job will scan this collection to decide which file to remove

uploads: {
  <puppetID 1 - userID>: {
    <file A ID>: <puppetID 1>
    <file B ID>: <puppetID 1>
  }
}
*/