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
 
function register() {
  //get input fields
  UIfirst_name = document.getElementById('first_name').value
  UIlast_name = document.getElementById('last_name').value
  UIemail = document.getElementById('email').value
  UIpassword = document.getElementById('password').value
  UIfavorite_song = document.getElementById('favorite_song').value
  const today = new Date()

  if (validate_field(UIfirst_name) == false || validate_field(UIlast_name) == false || validate_field(UIfavorite_song) == false) {
    alert('One or more fields is empty')
    return
  }

  //validate inputs
  if (validate_email(UIemail) == false || validate_password(UIpassword) == false) {
    alert('Email or password is incorrect')
    return
    //stops running code
  }

  //Move on with Auth
  auth.createUserWithEmailAndPassword(UIemail, UIpassword) //promise
  .then(function() {
    //Declare user variable
    var user = auth.currentUser

    //add user to firebase db
    var database_ref = database.ref()

    //create user data
    var user_data = {
      points: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      email: UIemail,
      first_name: UIfirst_name,
      last_name: UIlast_name,
      favorite_song: UIfavorite_song,
      last_login: today.toUTCString()
    }

    database_ref.child('users/' + user.uid).set(user_data)

  })
  .catch(function(error) {
    var error_message = error.message 
    alert(error_message)
  })

  setTimeout(function(){
    window.location.href='page.html'
 }, 2000);

}

function login() {
  //Get Email, login input fields
  UIemail = document.getElementById('email').value
  UIpassword = document.getElementById('password').value
  const today = new Date()

  if (validate_email(UIemail) == false || validate_password(UIpassword) == false) {
    alert('Email or password is incorrect')
    return
  }

  auth.signInWithEmailAndPassword(UIemail, UIpassword) //promise funct
  .then(function(){
    //Declare user variable
    var user = auth.currentUser

    //add user to firebase db
    var database_ref = database.ref()

    //create user data
    var user_data = {
      last_login: today.toUTCString()
    }

    database_ref.child('users/' + user.uid).update(user_data)
    window.location.href='page.html'
  })
  .catch(function(error){
    var error_message = error.message 
    alert(error_message)
  })

}


function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/ 
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false  
  } 
  
  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}