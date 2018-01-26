class API {
  constructor() {

  }

  getUrl(path) {
    return firebase.storage().ref(path).getDownloadURL();
  }

  async listLibraryPuppets() {
    let collections = await firebase.firestore().collection(`puppets`).get();
    let pods = [];
    collections.forEach(doc => {
      pods.push(doc.data());
    });
    return pods;
  }

  async listMyPuppets() {
    // collection.forEach(doc => {
    //   console.log(doc.id, doc.data())
    // })
    let collections = await firebase.firestore().collection(`users/${LookUp.user.uid}/myPuppets`).get();
    let pods = [];
    collections.forEach(doc => {
      pods.push(doc.data());
    });
    return pods;
  }

  async createMyPuppet(actor) {
    // generate entry in firestore
    const myPuppetID = firebase.firestore().collection(`users/${LookUp.user.uid}/myPuppets`).doc().id
    firebase.firestore().collection(`users/${LookUp.user.uid}/myPuppets`).doc(id).set({
      ...actor.export(),
      // FIXME: ask user to type a name
      name: `My ${actor.name}`,
      myPuppetID,
      userID: LookUp.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // get list of uploaded files used by the actor, write it to uploads collection
    let map = actor.createUserFileMap(myPuppetID);
    firebase.firestore().doc(`fileRefs/${myPuppetID}`).set(map)

    // upload snapshot blob to firebase storage
    const canvas = await actor.snapshot();
    canvas.toBlob(blob => {
      // upload file using the id
      firebase.storage().ref().child(`users/${LookUp.user.uid}/snapshots/${myPuppetID}-puppet-snapshot.png`).put(blob);
    });

    return myPuppetID;
  }

  async newCreation() {
    let pod = LookUp.pod();

    const activityID = firebase.firestore().collection(`users/${LookUp.user.uid}/creations`).doc().id;
    await firebase.firestore().collection(`users/${LookUp.user.uid}/creations`).doc(activityID).set({
      ...pod,
      id: activityID,
      userID: LookUp.user.uid
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
    
    await firebase.firestore().collection(`users/${LookUp.user.uid}/creations`).doc(pod.activityID).set(pod);

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