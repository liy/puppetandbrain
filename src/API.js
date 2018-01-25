class API {
  constructor() {

  }

  // TODO: to be removed
  updateTest(pod) {
    return firebase.firestore().doc(`puppets/${pod.sourceID}`).set(pod);
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
    let collections = await firebase.firestore().collection(`users/${LookUp.user.uid}/puppets`).get();
    let pods = [];
    collections.forEach(doc => {
      pods.push(doc.data());
    });
    return pods;
  }

  async createPuppet(actor) {
    // generate entry in firestore
    const puppetID = firebase.firestore().collection(`users/${LookUp.user.uid}/puppets`).doc().id
    firebase.firestore().collection(`users/${LookUp.user.uid}/puppets`).doc(id).set({
      ...actor.export(),
      // FIXME: ask user to type a name
      name: `My ${actor.name}`,
      puppetID,
      userID: LookUp.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // get list of uploaded files used by the actor, write it to uploads collection
    let map = actor.createUploadedMap(puppetID);
    firebase.firestore().doc(`uploads/${puppetID}`).set(map)

    // upload snapshot blob to firebase storage
    const canvas = await actor.snapshot();
    canvas.toBlob(blob => {
      // upload file using the id
      firebase.storage().ref().child(`users/${LookUp.user.uid}/snapshots/${id}-puppet-snapshot`).put(blob);
    });

    return puppetID;
  }

  async newCreation() {
    let pod = LookUp.pod();

    const id = firebase.firestore().collection(`users/${LookUp.user.uid}/creations`).doc().id;
    await firebase.firestore().collection(`users/${LookUp.user.uid}/creations`).doc(id).set({
      ...pod,
      id, 
      userID: LookUp.user.uid
    });

    // No need to have manifest for the activity, as you can scan through actors to
    // get all the files.
    //
    // Remember, everything on the stage is an Actor(puppet) 

    return id;
  }
}

export default new API();