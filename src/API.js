class API 
{
  constructor() {
  }
  

  uploadFile(data, hash, ext, path, contentType, referenceByID, onProgress=null, onError=null) {
    // TODO: check whether file storage already contains the hash
    // by fetch the file doc using the hash
    // if it does, no need to upload file again...

    // write a file entry.
    // note this is just a pure file entry and VAGUE look up list telling
    // cronjob which activity or exported puppet MIGHT BE using this file.
    //
    // Only fileRefs collection contains the up to date file references.
    firebase.firestore().collection('files').doc(`${hash}.${ext}`).set({
      [referenceByID]: true,
    }, {merge:true});

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

  getUrl(path) {
    return firebase.storage().ref(path).getDownloadURL();
  }

  async getActivity(id) {
    return (await firebase.firestore().collection('activities').doc(id).get()).data();
  }

  async saveActivity(pod, fileRefs) {
    // ensure both file reference and activity save in atomical manner
    let batch = firebase.firestore().batch();
    let activityRef = firebase.firestore().collection('activities').doc(pod.activityID);
    batch.set(activityRef, pod);
    let fileRefsRef = firebase.firestore().collection('fileRefs').doc(pod.activityID);
    batch.set(fileRefsRef, fileRefs)

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

  async createMyPuppet(actor) {
    // generate entry in firestore
    const myPuppetID = firebase.firestore().collection(`users/${CurrentUser.uid}/myPuppets`).doc().id
    firebase.firestore().collection(`users/${CurrentUser.uid}/myPuppets`).doc(id).set({
      ...actor.export(),
      // FIXME: ask user to type a name
      name: `My ${actor.name}`,
      myPuppetID,
      userID: CurrentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // get list of uploaded files used by the actor, write it to uploads collection
    let map = actor.createUserFileMap(myPuppetID);
    firebase.firestore().doc(`fileRefs/${myPuppetID}`).set(map)

    // upload snapshot blob to firebase storage
    const canvas = await actor.snapshot();
    canvas.toBlob(blob => {
      // upload file using the id
      firebase.storage().ref().child(`users/${CurrentUser.uid}/snapshots/${myPuppetID}-puppet-snapshot.png`).put(blob);
    });

    return myPuppetID;
  }

  async newCreation() {
    let pod = LookUp.pod();

    const activityID = firebase.firestore().collection(`users/${CurrentUser.uid}/creations`).doc().id;
    await firebase.firestore().collection(`users/${CurrentUser.uid}/creations`).doc(activityID).set({
      ...pod,
      id: activityID,
      userID: CurrentUser.uid
    });

    // Update fileRefs
    let userFiles = [];
    for(let actor of LookUp.getActors()) {
      userFiles = userFiles.concat(actor.getUserFiles());
    }
    let map = userFiles.map(userFile => {
      return {
        [userFile.fileID]: true
      }
    })
    firebase.firestore().doc(`fileRefs/${activityID}`).set(map)

    return activityID;
  }

  async updateCreation() {
    let pod = LookUp.pod();
    
    await firebase.firestore().collection(`users/${CurrentUser.uid}/creations`).doc(pod.activityID).set(pod);

    // Update fileRefs
    let userFiles = [];
    for(let actor of LookUp.getActors()) {
      userFiles = userFiles.concat(actor.getUserFiles());
    }
    let map = userFiles.map(userFile => {
      return {
        [userFile.fileID]: true
      }
    })
    firebase.firestore().doc(`fileRefs/${pod.activityID}`).set(map)
  }
}

export default new API();