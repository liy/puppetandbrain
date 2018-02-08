# Getting started

Need more detail description. But for now, you can run the command in terminal to get the example showing in the browser and start digging.

```
npm install
npm start
```

# puppet package template
```javascript
let bundle = {
  puppetID: "zqTVeCemqwv4Wr6A55tf",
  // all the puppets are originated from the library puppet,
  // this points to the original puppet doc
  // 
  // for accessing predefined spine files, etc.
  libDir: "library/puppets",

  name: "Fat cat",
  
  // read only
  // list of files from libDir directory, these files are defined by default, officially.
  libFiles: [],

  // When user export an actor into MyPuppet, and ID will be generated.
  // Any current user files will be write to fileRefs with the myPuppetID as key.
  // In this case, if user delete the activity, certain file references will
  // still retained by MyPuppet. 
  //
  // Therefore, cronjob will not delete the user files. Just like a garbage collection process... 
  myPuppetID: null,

  // list of file ids uploaded by user
  // useful when loading the puppets, so we don't need to send extra request to
  // fetch the list of user uploads
  userFiles: [],


  // this is the id for PIXI spine animation  
  spineID: "cat",


  // After this point, are the normal game play pod object.
  // className: "SpineActor" 
  // ......
  
}





// Cron job will check against this collection to decide which file to remove
let fileRefs = {
  activityID_1: {
    fileID_1: true,
    fileID_2: true
  },
  puppetID_1: {
    fileID_3: true,
    fileID_4: true,
  }
}

// Cron job scan this one by one, check activity id against fileRefs see whether this file is really
// referenced by activity or myPuppet, if not, activity id and mypuppet id will be removed.
// if no id exist in the entry anymore, the file is free to delete.
let userFiles = {
  fileID: {
    activityID_1: true
  }
}
```

# Merge
Flip Left & Flip Right
Step Up & Step Down & Step Right & Step Left
Rotate aniticlockwise & Rotate clockwise
Hover & Unhover => Hover.on Hover.off
Click & Release => Mouse.down & Mouse.up
Operators into 1 block
logic into 1 block

Game start & Game Loop into Game?

# Hide
Make Position
Extractor
Break Position
Release