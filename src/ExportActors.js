export default class 
{
  constructor() {

  }

  start(pod) {
    pod.userID = LookUp.user.uid;
    firebase.firestore().collection('users').doc(LookUp.user.uid).collection('puppets').add(pod).then(e => {
      console.log(e);
    })
  }
}