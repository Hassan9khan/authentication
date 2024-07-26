import { onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js"

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
        window.location = 'login.html'
    }
  });

  const logout =document.querySelector('#logout')

  logout.addEventListener ('click', ()=>{
    
         signOut(auth).then(() => {
            console.log('logout successfully');
            window.location = 'login.html'
         }).catch((error) => {
          console.log(error);
        });
  })
  