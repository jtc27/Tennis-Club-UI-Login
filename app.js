// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB2Ay8XKD7ig3hF4x2uiaUzjkxQQRxIKzY",
  authDomain: "login-with-firebase-data-94ec5.firebaseapp.com",
  projectId: "login-with-firebase-data-94ec5",
  storageBucket: "login-with-firebase-data-94ec5.appspot.com",
  messagingSenderId: "102340638590",
  appId: "1:102340638590:web:33b1e98cf79b9c6e02652f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//init var
const auth = firebase.auth();
const database = firebase.database();

function goToRegisterPage() {
  window.location.href='register.html'
}

function goToLoginPage() {
  window.location.href='index.html'
}