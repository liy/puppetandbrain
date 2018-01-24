class API {
  constructor() {

  }

  async getPuppets() {
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
    const id = firebase.firestore().collection(`users/${LookUp.user.uid}/puppets`).doc().id
    firebase.firestore().collection(`users/${LookUp.user.uid}/puppets`).doc(id).set({
      ...actor.export(),
      // FIXME: ask user to type a name
      name: `My ${actor.name}`,
      id,
      userID: LookUp.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // upload blob to firebase storage
    const canvas = await actor.snapshot();
    canvas.toBlob(blob => {
      // upload file using the id
      firebase.storage().ref().child(`users/${LookUp.user.uid}/snapshots/${id}-puppet-snapshot`).put(blob);
    });

    return id;
  }

  async newCreation() {
    let pod = LookUp.pod();

    const id = firebase.firestore().collection(`users/${LookUp.user.uid}/creations`).doc().id;
    await firebase.firestore().collection(`users/${LookUp.user.uid}/creations`).doc(id).set({
      ...pod,
      id, 
      userID: LookUp.user.uid
    });

    return id;
  }
}

export default new API();