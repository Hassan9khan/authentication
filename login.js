import { signInWithEmailAndPassword ,
         sendPasswordResetEmail
 } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js"

const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')


form.addEventListener('submit', (event)=>{
    event.preventDefault(); 

    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    window.location = 'home.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
   
})

// const email = document.querySelector('#email')

// email.addEventListener('submit' , (event)=>{
//   event.preventDefault

//   sendPasswordResetEmail(auth, email.value)
//   .then(() => {
//     console.log('Password reset email sent');
//     alert('Password reset email sent. Please check your inbox.');
//   })
//   .catch((error) => {
//     console.error('Error sending password reset email:', error);
//     alert('Error sending password reset email. Please try again.');
//   });

// })
