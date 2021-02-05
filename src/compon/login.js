import React, {useState} from "react"
import axios from "axios"

function LoginPage({currentUserUpdater}){
    const [registerUsername, setRegisterUsername] = useState("")
    const [regiserPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [info, setData] = useState(null);
  
  
  //  function testRunner(callback1,callback2){
    // login()
  //  callback1();
  //  callback2();
  
   //dont turn this on if you turn testrunner back on..just notes 
    //  if (info){
    //   alert(`Welcome back ${info.username}`)
    //   // alert("Welcome back!")
    //   setTimeout(function(){
      
    //     window.location = "/history"
    //   },3000)
    //  } else {
    //    alert("Wrong Username or password")
    //  }
  // }
  
  
  const register = () => {
  const userData = {
     username: registerUsername,
     password: regiserPassword,
     userid: Number(Math.round((Math.random() * (10000 -1)+ 1) ))
  
  }
  // axios.post("http://localhost:5000/users/add", userData, {withCredentials: true})
  axios.post("https://storres86.github.io/users/add", userData, {withCredentials: true})
  //  .then(res => console.log(res.data))
  .then(alert("Thank you for joining!"))
  window.location ="/createSession"
  }
  
  async function promised(){
    try {
   const l = await login();
   const g = await getUser().then(() => {
     window.location = "/history"
   });
    } catch (err){
      console.log(err);
    }
  }
  
  function login(){
    return new Promise((resolve,reject) => {
        let data = {
        username: loginUsername,
        password: loginPassword
        }
        resolve(
      // axios.post("http://localhost:5000/users/login", data, {withCredentials: true})
      axios.post("https://storres86.github.io/users/login", data, {withCredentials: true})
    .then((res) => console.log(res))
        )
        reject(console.log("login promise did not work"))
    })
  }
  
  function getUser(){
    return new Promise((resolve,reject) => {
      // axios.get("http://localhost:5000/users/locker", {withCredentials: true} )
      axios.get("https://storres86.github.io/users/locker", {withCredentials: true} )
      .then((res) => {
        if (res.data.username){
          resolve(
            setData(res.data)
            // alert(`Welcome back ${res.data.username}`)
                // window.location = "/history"
          )
        } else {
          // reject("the get user promise failed")
          reject(alert("Wrong Username or Password"))
        }
      })
    })
  }
  
  // function showPW(){
  //   let pwfield = document.getElementById("pw").type;
  //   console.log(pwfield);
  //   if (pwfield == "password"){
  //     pwfield === "text"
  //   } else {
  //     pwfield === "password"
  //   }
  // }
  
  
  
  
  //old login that works but without promise
  // const login = () => {
  //   let data = {
  //       username: loginUsername,
  //       password: loginPassword
   
  //   }
  //   axios.post("http://localhost:5000/users/login", data, {withCredentials: true})
  //   .then((res) => console.log(res))
  // }
  
  //old getuser that works but without promise
  // const getUser = () => {
  //   axios.get("http://localhost:5000/users/locker", {withCredentials: true} )
  //   .then((res) => {
  //     if (res.data.username){
  //       console.log(res);
  //       setData(res.data);
  //         alert(`Welcome back ${res.data.username}`)
  //             window.location = "/history"
  //     } else {
  //          alert("Wrong Username or password")
  //     }
      
  //   })
  // }
  
  
  
    return(
        <div>
            <h1>Hello! Welcome to tutor helper2!</h1>
            <p>Tutor helper allows you to quickly and easily save all of your tutoring sessions. With a few clicks you will be able to log all sessions and quickly send over the invoice for payment.</p>
            <h1>Login</h1>
            <input placeholder="username please" onChange={e => setLoginUsername(e.target.value)} />
            <input type = "password" placeholder = "password please" onChange={e => setLoginPassword(e.target.value)} />
            {/* <input type="submit" onClick={() => testRunner(login,getUser)}/> */}
            <input type="submit" onClick={promised}/>
           
            <br></br>
            <br></br>
            <h1>Create a free account</h1>
            <input placeholder="username please" onChange={e => setRegisterUsername(e.target.value)} />
            <br/>
            <input type="password" id="pw" placeholder = "password please" onChange={e => setRegisterPassword(e.target.value)} />
            {/* <input type="checkbox" onClick={showPW}/> Show Password */}
            <br/>
            {/* <input placeholder = "first name please" /> */}
        <br/>
            <input type="submit" onClick={register}/>
            <p>Your chosen Username is : {registerUsername}</p>
            <p>Your chosen Password is :{regiserPassword}</p>
            {info ? <h1>Hello {info.username}, {info.userid}</h1> : ""}
        </div>
    )
  
  }

export default LoginPage