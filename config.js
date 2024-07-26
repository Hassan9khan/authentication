import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDu4BvHnV6RMUK9mllOxVU3GDcrtkv6c_4",
  authDomain: "authentication-firebase-02.firebaseapp.com",
  projectId: "authentication-firebase-02",
  storageBucket: "authentication-firebase-02.appspot.com",
  messagingSenderId: "482218054934",
  appId: "1:482218054934:web:69f001f5e4067303916c37"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)