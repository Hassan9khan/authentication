import { onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth , db } from "./config.js"
import { 
    collection, 
    addDoc , 
    getDocs,
    doc,
    deleteDoc,
    updateDoc, 
    Timestamp,
    query,
    where,
    orderBy,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
    
    
    
  const form = document.querySelector('#form')
  const todo = document.querySelector('#todo')
  const ul   = document.querySelector('#ul')
  const select   = document.querySelector('#select')
  const reset = document.querySelector('.reset') 
  const citiesBtn   = document.querySelectorAll('.cities-btn')
    

  let arr []
    


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
        window.location = 'index.html'
    }
  });

  const logout =document.querySelector('#logout')

  logout.addEventListener ('click', ()=>{
    
         signOut(auth).then(() => {
            console.log('logout successfully');
            window.location = 'index.html'
         }).catch((error) => {
          console.log(error);
        });
  })


  //cities 

  citiesBtn.forEach((btn) => {
    btn.addEventListener('click', async (event) =>{
      arr =[]
      console.log(event.target.innerHTML);
      const todoRef = collection(db , "todos")
      const querySnapshot= query(
        todoRef,
        where("city", " ==", event.target.innerHTML ),
        orderBy("time", "desc")
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) =>{
        arr.push({...doc.data() , id: doc.id})
      })
      console.log(arr);
      renderTodo()
      
    })
  })
  
  reset.addEventListener('click' , getData)




// const description = document.querySelector('#description')

let arr = [];

async function getData(){
    const arr = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    arr.push(doc.data())  
  });
  console.log(arr);
}

getData( )

//render data on screen

function renderTodo() {
  ul.innerHTML = "";
  if (arr.lenght === 0) {
    ul.innerHTML = "no data found";
    return;
  }
  arr.map((item) =>{
    ul.innerHTML +=`
      <li>${item.code}
        <button class="delete-btn">Delete</button>
        <button class="edit-btn">Edit</button>
      </li>
      <p>
      ${item.time ? item.time.toDate() : "no time"}
      </p>
      <hr>
      `;
  })
}


// Add todo in Database

form.addEventListener('submit', async (event)=>{
  event.preventDefault();
  // console.log(todo.value);
  // console.log(description.value);

  try {
    const docRef = await addDoc(collection(db, "users"), 
    {
      todo: todo.value,
      // description: description.value,
      // uid:auth.currentUser.uid
    });
    console.log("Document written with ID: ", docRef.id);
    arr.push({
      todo : todo.value,
      id: docRef.id,
    })
    renderTodo();
    todo.value = " " ;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})


