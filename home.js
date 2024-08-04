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
  const select  = document.querySelector('#select')
  const reset = document.querySelector('.reset') 
  const citiesBtn   = document.querySelectorAll('.cities-btn')
    


  let arr = [];    


  
  
  //cities 

  
  citiesBtn.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      let arr = [] ;
      console.log(event.target.innerHTML);
      const todosRef = collection(db , "todos")
      
      try {
        const q = query(
          todosRef,
          where("city", "==", event.target.innerHTML ),
          orderBy("time", "desc")
        )
        
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
        arr.push({...doc.data() , id: doc.id})
      })
      console.log(arr);
      renderTodo();
      
      } catch (error) {
        console.error("Error getting document : " , error);
      }    
      console.log(arr);
      renderTodo();
      
    })
  })
  
  reset.addEventListener('click' , getData)
  
  
  
  
  // const description = document.querySelector('#description')
  
  async function getData(){
    arr = []
    const q = query(collection(db, 'todos'), orderBy('time', 'desc'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    arr.push({...doc.data(), id: doc.id})  
  });
  console.log(arr);
  renderTodo()
}

getData( )

//render data on screen

function renderTodo() {
  ul.innerHTML = "";
  if (arr.lenght === 0) {
    ul.innerHTML = "no data found";
    return;
  }
  arr.map((item) => {
    ul.innerHTML +=`
    <li>${item.todo}
    <button class="deleteBtn">Delete</button>
    <button class="editBtn">Edit</button>
    </li>
    <p>
    ${item.time ? item.time.toDate() : "no time"}
    </p>
    <hr />
    `;
  })

  
  
const deleteBtn = document.querySelectorAll('.deleteBtn')
const editBtn = document.querySelectorAll('.editBtn')

deleteBtn.forEach((btn , index) => {
  btn.addEventListener('click' , async () => {
    console.log(arr[index]);
    await deleteDoc(doc(db, 'todos' , arr[index].id))
    console.log("data deleted");
    arr.splice(index , 1)
    renderTodo()  
  })
})

editBtn.forEach((btn , index) => {
  btn.addEventListener('click' , async () => {
    const updatedNewValue = prompt('enter new value')
    const todoUpdate = doc(db , 'todos' , arr[index].id)
    await updateDoc(todoUpdate, {
      todo: updatedNewValue,
    });
    console.log('Data Updated');
    arr[index].todo = updatedNewValue
    renderTodo();
    
  })
})
}



// Add todo in Database

form.addEventListener('submit', async (event)=>{
  event.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "todos"), 
    {
      todo: todo.value,
      city: select.value,
      time: Timestamp.fromDate(new Date()), 
    });
    console.log("Document written with ID: ", docRef.id);
    arr.push({
      todo : todo.value,
      id: docRef.id,
      city: select.value,
    });
    renderTodo();
    todo.value = " " ;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})



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