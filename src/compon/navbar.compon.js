import React, { Component }  from 'react';
import {Link} from "react-router-dom";
import axios from "axios"


export default class Navbar extends Component {
  constructor(){
    super()
    this.state = {
      user: "",
    }
  }

  
// async componentDidMount() {

//   // Make requests
//   const [firstResponse] = await Promise.all([
//     axios.get(`http://localhost:5000/users/locker`,{withCredentials: true}),
    
//   ]);
// this.setState({
//   user: firstResponse.data.username
// })
// }

// componentDidMount(){
//   axios.get(`http://localhost:5000/users/locker`,{withCredentials: true})
//   .then(response => {
//       this.setState({
//           // id: response.data._id,
//           user: response.data.username,
//       })
//   })
//   .catch(function(error){
//       console.log(error);
//   })
// }

   loggedoutnow = () =>{
    axios.get("http://localhost:5000/users/logout",  { withCredentials: true })
    .then(alert("You have logged out. "))
    .then(window.location = "/")
    
  }


  //this was the stuff I was using to try and hide the log out button when logged out Dont erase this section
//   checkloggedin(){
// axios.get(`http://localhost:5000/users/locker`, {withCredentials:true})
// .then(response => {
//   console.log(response.data.username);
//   if (response.data.username){
//     console.log("the button should pop up");
//      <button onClick={this.loggedoutnow}  className="btn btn-danger dng">Log Out</button>
//   } else {
//     console.log("no one is logged in")
//   }
// }).catch(error => {
//   console.log("check loggin error", error);
// })
// }

// componentDidMount(){
//   this.checkloggedin()
// }




  

render(){
    return(
  <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
  {/* <Link to="/" className="navbar-brand">HomePage</Link> */}
  <div className="collpase navbar-collapse">
  <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
    <Link to="/history" className="navbar-brand">Client History</Link>
    </li>
    <li className="navbar-item">
    <Link to="/createSession" className="nav-link">Create Session</Link>
    </li>
    <li className="navbar-item">
    <Link to="/CreateUser" className="nav-link">Create New Client</Link>
   {/* { this.checkloggedin === true  ? <button onClick={this.loggedoutnow}  className="btn btn-danger dng">Log Out</button>: null} */}
   {/* {this.checkloggedin} */}
   </li>
   <li className="navbar-item">
   <a href="mailto:storres865@gmail.com" className ="nav-link" >Contact us</a>
    </li>
   <li className="navbar-item">
   <Link to="#" className ="nav-link" onClick ={this.loggedoutnow}>Log Out</Link>
    </li>
  </ul>
  </div>
</nav>
    );
  }
}

// function Navbar(){


  
//    const loggedoutnow = () =>{
//     axios.get("http://localhost:5000/users/logout",  { withCredentials: true })
//     .then(alert("You have logged out. "))
//     window.location = "/"
//   }
  

  
//       return(
//              <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
//           {/* <Link to="/" className="navbar-brand">HomePage</Link> */}
//           <div className="collpase navbar-collapse">
//           <ul className="navbar-nav mr-auto">
//             <li className="navbar-item">
//             <Link to="/history" className="navbar-brand">Client History</Link>
//             </li>
//             <li className="navbar-item">
//             <Link to="/createSession" className="nav-link">Create Session</Link>
//             </li>
//             <li className="navbar-item">
//             <Link to="/CreateUser" className="nav-link">Create New Client</Link>
//            <button onClick={loggedoutnow}  className="btn btn-danger dng">Log Out</button>
//             </li>
//           </ul>
//           </div>
//         </nav>
//       );
//     }

//     export default Navbar
  