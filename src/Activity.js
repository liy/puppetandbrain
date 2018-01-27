export default 
{
  activityID: null,

  load: async function() {
    // TODO: get data from firestore
    let doc = await firebase.firestore().collection('activities').doc(activityID).get();
    var loader = new ActivityLoader();
    let pod = doc.data();
    loader.parse(pod)
    LookUp.setActivityID(activityID);
    LookUp.setOwnerID(pod.userID);

    let promises = LookUp.getActors().map(actor => {
      return actor.loaded;
    })
  },

  create: function() {

  },

  clone: function() {

  },

  save: function() {

  }
}