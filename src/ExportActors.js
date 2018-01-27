export default class 
{
  constructor() {

  }

  start(pod) {
    pod.userID = CurrentUser.uid;
    firebase.firestore().collection('users').doc(CurrentUser.uid).collection('puppets').add(pod).then(e => {
      console.log(e);
    })
  }
}