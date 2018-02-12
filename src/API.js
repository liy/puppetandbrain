class API 
{
  constructor() {
  }
  

  async uploadFile(data, hash, ext, path, contentType, referenceByID, onProgress=null, onError=null) {
    // check whether file storage already contains the hash
    // by fetch the file doc using the hash
    // if it does, no need to upload file again...
    let fileRef = firebase.firestore().doc(`files/${hash}.${ext}`);
    let doc = await fileRef.get();

    // write a file entry.
    // note this is just a pure file entry and VAGUE look up list telling
    // cronjob which activity or exported puppet MIGHT BE using this file.
    //
    // Only fileRefs collection contains the up to date file references.
    // 
    // If this operation fails occationally, not a big deal. Therefore I did not use batch
    // or await.
    fileRef.set({
      [referenceByID]: true,
    }, {merge:true});

    if(doc.exists) {
      console.info('file exist no need to upload');
      return Promise.resolve();
    }

    console.info('uploading file');
    let ref = firebase.storage().ref(path);
    return new Promise(resolve => {
      let task = ref.put(data, {contentType});
      task.on('state_changed', 
        onProgress, 
        onError,
        function complete() {
          console.log('done');
          resolve();
        })
    })
  }

  
  cloneActivity(pod, files, fileRefs) {
    let batch = firebase.firestore.batch();

    // loop through all file entry, this will tell cronjob that
    // such file is used by this newly cloned activity
    let fileNames = Object.keys(files)
    for(let fileName of fileNames) {
      let ref = firebase.firestore().collection('files').doc(fileName);
      batch.commit(ref, files[fileName])
    }

    // file refs, this will tell crontjob that this activity is using this
    // set of files
    let fileRefsRef = firebase.firestore().collection('activityFileRefs').doc(pod.activityID);
    batch.set(fileRefsRef, fileRefs)
    // actual cloned activity
    let activityRef = firebase.firestore().collection('activities').doc(pod.activityID);
    batch.set(activityRef, pod);

    return batch.commit().then(() => {
      console.info('Successfully cloned activity')
    }).catch(error => {
      console.error('Error clone activity: ', error);
      throw(error);
    });
  }

  async getActivity(id) {
    return (await firebase.firestore().collection('activities').doc(id).get()).data();
  }

  async saveActivity(pod, fileRefs) {
    // ensure both file reference and activity save in atomical manner
    let batch = firebase.firestore().batch();
    let activityRef = firebase.firestore().collection('activities').doc(pod.activityID);
    batch.set(activityRef, pod);

    if(Object.keys(fileRefs).length != 0) {
      let fileRefsRef = firebase.firestore().collection('activityFileRefs').doc(pod.activityID);
      batch.set(fileRefsRef, fileRefs)
    }

    return batch.commit().then(() => {
      console.info('Successfully saved activity')
    }).catch(error => {
      console.error('Error saving activity: ', error);
      throw(error);
    });
  }

  async listLibraryPuppets() {
    let pods = [];
    try {
      let collections = await firebase.firestore().collection(`puppets`).get();
      collections.forEach(doc => {
        pods.push(doc.data());
      });
    }
    catch(err) {
      throw err;
    }
    
    return pods;
  }

  async listMyPuppets() {
    let pods = [];
    try {
      let collections = await firebase.firestore().collection(`users/${CurrentUser.uid}/myPuppets`).get();
      collections.forEach(doc => {
        pods.push(doc.data());
      });
    }
    catch(err) {
      throw err;
    }

    return pods;
  }

  async createMyPuppet(actor, name) {
    // generate entry in firestore
    const myPuppetID = firebase.firestore().collection(`users/${CurrentUser.uid}/myPuppets`).doc().id
    firebase.firestore().collection(`users/${CurrentUser.uid}/myPuppets`).doc(myPuppetID).set({
      ...actor.export(),
      name,
      myPuppetID,
      userID: CurrentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // update files reference
    let fileRefs = {}
    let files = {};
    let userFiles = actor.getUserFiles();
    for(let fileData of userFiles) {
      fileRefs[fileData.path] = true;
      // elminate the dupicate user files
      files[`${fileData.hash}.${fileData.ext}`] = {[myPuppetID]: true}
    }
    
    // update puppet to file references pair
    if(userFiles.length != 0) {
      firebase.firestore().doc(`myPuppetFileRefs/${myPuppetID}`).set(fileRefs)
    }

    // Update file to puppet pair
    Object.keys(files).forEach(file => {
      firebase.firestore().collection('files').doc(file).set({
        [myPuppetID]: true,
      }, {merge:true});
    })


    // upload snapshot blob to firebase storage
    const canvas = await actor.snapshot();
    canvas.toBlob(blob => {
      // upload file using the id
      firebase.storage().ref().child(`users/${CurrentUser.uid}/snapshots/${myPuppetID}-puppet-snapshot.png`).put(blob);
    });

    return myPuppetID;
  }

  deleteMyPuppet(myPuppetID, userID=CurrentUser.uid) {
    let batch = firebase.firestore().batch();

    let ref1 = firebase.firestore().doc(`users/${userID}/myPuppets/${myPuppetID}`);
    batch.delete(ref1);
    let ref2 = firebase.firestore().doc(`myPuppetFileRefs/${myPuppetID}`);
    batch.delete(ref2);
    return batch.commit();
  }

  getUrl(path) {
    return firebase.storage().ref(path).getDownloadURL();
  }

  // async newCreation() {
  //   let pod = LookUp.pod();

  //   const activityID = firebase.firestore().collection(`users/${CurrentUser.uid}/creations`).doc().id;
  //   await firebase.firestore().collection(`users/${CurrentUser.uid}/creations`).doc(activityID).set({
  //     ...pod,
  //     id: activityID,
  //     userID: CurrentUser.uid
  //   });

  //   // Update fileRefs
  //   let userFiles = [];
  //   for(let actor of LookUp.getActors()) {
  //     userFiles = userFiles.concat(actor.getUserFiles());
  //   }
  //   let map = userFiles.map(userFile => {
  //     return {
  //       [userFile.fileID]: true
  //     }
  //   })
  //   firebase.firestore().doc(`fileRefs/${activityID}`).set(map)

  //   return activityID;
  // }

  // async updateCreation() {
  //   let pod = LookUp.pod();
    
  //   await firebase.firestore().collection(`users/${CurrentUser.uid}/creations`).doc(pod.activityID).set(pod);

  //   // Update fileRefs
  //   let userFiles = [];
  //   for(let actor of LookUp.getActors()) {
  //     userFiles = userFiles.concat(actor.getUserFiles());
  //   }
  //   let map = userFiles.map(userFile => {
  //     return {
  //       [userFile.fileID]: true
  //     }
  //   })
  //   firebase.firestore().doc(`fileRefs/${pod.activityID}`).set(map)
  // }
}

export default new API();