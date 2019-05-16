import Firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAwdpAclmegdbaLRHRGA0nzl9rDzUINSqA",
    authDomain: "managerapp-33639.firebaseapp.com",
    databaseURL: "https://managerapp-33639.firebaseio.com",
    projectId: "managerapp-33639",
    storageBucket: "managerapp-33639.appspot.com",
    messagingSenderId: "882224135414",
    appId: "1:882224135414:web:f263d1781d0a40ff"
  };

export const Fire = Firebase.initializeApp(firebaseConfig)