import React, {useState} from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route} from "react-router-dom";
// import Navbar from "./components/navbar.component";

import './App.css';

import EditSession from './compon/edit-session.compon';
import CreateSession from "./compon/create-session.compon";
import CreateClient from './compon/create-client.compon';
import Navbar from './compon/navbar.compon';
import ClientHistory from './compon/client-history.compon'
import EditClient from "./compon/edit-client.compon"


function LoginPage2({currentUserUpdater}){
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
axios.post("http://localhost:5000/users/add", userData, {withCredentials: true})
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
    axios.post("http://localhost:5000/users/login", data, {withCredentials: true})
  .then((res) => console.log(res))
      )
      reject(console.log("login promise did not work"))
  })
}

function getUser(){
  return new Promise((resolve,reject) => {
    axios.get("http://localhost:5000/users/locker", {withCredentials: true} )
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



class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      currentUser: "",
    currentUserID: 0}
    this.currentUserUpdater = this.currentUserUpdater.bind(this)
  }


currentUserUpdater(username,id){
  this.setState({
    currentUser: username,
    currentUserID: id,
  })
  console.log(this.state.currentUser);
}

render(){
  return (
  <Router>
    <div className="container">
    <Navbar />
    <br/>
    {/* <Route exact path="/" exact component ={LoginPage2} /> */}
    <Route
  exact path='/'
  render={(props) => (
    // <CreateSession {...props} testClient={0>2 ?  "Brian": "Tom" } />
    <LoginPage2 {...props} currentUserUpdater={this.currentUserUpdater} />
  )}
/>
    {/* <Route exact path="/history" exact component={ClientHistory} /> */}
    <Route
  exact path='/history'
  render={(props) => (
    // <CreateSession {...props} testClient={0>2 ?  "Brian": "Tom" } />
    <ClientHistory {...props} testClient={this.state.currentUser} testClientID={this.state.currentUserID}  />
  )}
/>
    {/* <Route path="/edit/:id" exact component={EditSession} /> */}
    <Route
  path='/edit/:id'
  render={(props) => (
    <EditSession {...props} testClient={this.state.currentUser} testClientID={this.state.currentUserID} />
  )}
/>
    {/* <Route path="/createSession" component={CreateSession} /> */}
    <Route
  path='/createSession'
  render={(props) => (
    <CreateSession {...props} testClient={this.state.currentUser} testClientID={this.state.currentUserID} />
  )}
/>
    {/* <Route path="/createUser" component={CreateClient} /> */}
    <Route
  path='/createUser'
  render={(props) => (
    <CreateClient {...props} testClient={this.state.currentUser} testClientID={this.state.currentUserID} />
  )}
/>
    {/* <Route path="/editClient/:id" exact component={EditClient} /> */}
    <Route
  path='/editClient/:id'
  render={(props) => (
    <EditClient {...props} testClient={this.state.currentUser} testClientID={this.state.currentUserID} />
  )}
/>
    </div>
  </Router>
  );
}
}

export default App;
