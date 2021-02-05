import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import axios from "axios"
import SessionList from "./session-list.compon";
import {Link} from "react-router-dom"
// import EditSession from "./edit-session.compon";



export default class  CreateSession extends React.Component {
  constructor(props){
super(props)
this.state ={
  user: "",
  userId: 0,
  clients: [],
  currentClient: "",
  sessionLength: "",
  startTime: "",
  sessionDate: new Date(),
  sessionPaid: false,
  clientId: "",
}
this.onChangeClient = this.onChangeClient.bind(this);
this.onChangeSessionLength = this.onChangeSessionLength.bind(this);
this.onChangeDate = this.onChangeDate.bind(this);
this.onChangeStartTime = this.onChangeStartTime.bind(this)
this.showSessions = this.showSessions.bind(this)
this.onSubmit = this.onSubmit.bind(this);
this.editClientLink = this.editClientLink.bind(this)
this.clientIdGrabber = this.clientIdGrabber.bind(this);


  }

// componentDidMount(){
// axios.get("http://localhost:5000/clients/")
// .then(response => {
//   if (response.data.length > 0){
//     this.setState({
//       user: this.props.testClient,
//       userId: this.props.testClientID,
//       clients: response.data
//       .filter(clientsthatbelongtocurrentuser => clientsthatbelongtocurrentuser.userId === this.props.testClientID )
//       .map(client => client.firstName + " " + client.lastName),
//       // currentClient: response.data[0].currentClient,
//       // clientId: response.data[0]._id
//     })
//   }
// })
// }

async componentDidMount() {

  // Make requests
  const [firstResponse, secondResponse,] = await Promise.all([
    // axios.get(`http://localhost:5000/users/locker`,{withCredentials: true}),
    // axios.get("http://localhost:5000/clients/"),
    axios.get(`https://storres86.github.io/users/locker`,{withCredentials: true}),
    axios.get("https://storres86.github.io/clients/"),
  ]);

  // Update state once with all 3 responses
  this.setState({
      user: firstResponse.data.username,
      userId: firstResponse.data.userid,
      clients: secondResponse.data
              .filter(clientsthatbelongtocurrentuser => clientsthatbelongtocurrentuser.userId === firstResponse.data.userid )
                .map(client => client.firstName + " " + client.lastName),
                currentClient: secondResponse.data[0].currentClient,
        //  currentClient: secondResponse.data[0].currentClient,
      clientId: secondResponse.data[0]._id
  });

}


clientIdGrabber(){
// axios.get("http://localhost:5000/clients/")
axios.get("https://storres86.github.io/clients/")
.then(response => {
  let x = response.data.filter(client => client.clientFullName == this.state.currentClient )
  let y = x[0].clientFullName
  // if (this.state.currentClient == response.data.filter(client => client.clientFullName == this.state.currentClient )){
    // if (this.state.clientFullName == x){
      if (this.state.currentClient == y){
    this.setState({
      clientId: x[0]._id,
    
    },console.log("poop yes", x, y))
  } else {console.log("poop no");}
})
}

onChangeClient(e){
    this.setState({currentClient: e.target.value,},this.clientIdGrabber())
  }
  

onChangeSessionLength(e){
this.setState({  
    sessionLength: e.target.value
  })
}

onChangeDate(date){
  this.setState({
    sessionDate: date
  })
}

onChangeStartTime(e){
  this.setState({
    startTime: e.target.value
  })
  
}

showSessions(){
  if (this.state.currentClient == null){
    return <p>Loading...</p>
  } else  return <SessionList currentClient={this.state.currentClient} user={this.state.user} />
}

onSubmit(e){
  e.preventDefault();
// console.log(this.state.clientId);

// let testDate = String(this.state.sessionDate).replace(/-/g, '\/').replace(/T.+/, '')

  const newSessionDataPackage = {
    user: this.state.user,
    userId: this.state.userId,
    currentClient: this.state.currentClient,
    sessionLength: this.state.sessionLength,
    startTime: this.state.startTime,
    sessionDate: new Date(this.state.sessionDate.toDateString()),
    sessionPaid: this.state.sessionPaid,
    // clientId: this.state.clientId
  }
  console.log(newSessionDataPackage);
  
  // axios.post("http://localhost:5000/sessions/add", newSessionDataPackage)
  axios.post("https://storres86.github.io/sessions/add", newSessionDataPackage)
  .then(alert("A new session has been added"))

  // .catch(alert("Error: 400, failed to add session"))

  window.location = "/history"
  // this.props.history.push("/history")
}

editClientLink(){
  if (this.state.currentClient == "") {
    return null
  } else return <Link to={"/editClient/"+this.state.clientId}>Edit Client</Link>
  // } else return <Link to={EditSession}>Edit Client</Link>
}



  render(){
  return (

<div className="App">
   <h1>Hello {this.state.user}</h1>
   {/* <Link to="/create">Create New Client</Link>
   <Route path="/create" exact component={CreateClient}/> */}
   
  
<div>
<form onSubmit={this.onSubmit}>
    <label>Client:</label>
    <select required value={this.state.currentClient} defaultValue ="" onChange={this.onChangeClient}>
    <option key="default" value="" disabled  >Pick Client</option>
    {this.state.clients.map(function(client){
    return <option key={client} value={client} >
    {client}
    </option>
    })}
    </select>
    <div>{this.editClientLink()}</div>
<br/>
    <label>TimeFrame:</label>
    <select required onChange={this.onChangeSessionLength} >
    <option>Please Pick Time Frame</option>
    <option>30 Mins</option>
    <option>1 Hour</option>
    <option>2 Hours</option>
    <option>Custom</option>
    </select>
<br/>
    <label>Session Date:</label>
    <DatePicker
    selected= {this.state.sessionDate}
    onChange={this.onChangeDate}
    />
<br/>
    <label>Session Start Time:</label>
    {/* <input type="text" id="start" name="start" required onChange={this.onChangeStartTime}/> */}
    <input type="time" id="start" name="start" required onChange={this.onChangeStartTime}/>
<br/>
    <p> The current Client is: {this.state.currentClient}</p>
<br/>
<p> The current Client id is: {this.state.clientId}</p>
<br/>
    <p> The Length of the session is: {this.state.sessionLength}</p>
<br/>
<p> The Date of the session is {String(this.state.sessionDate)}</p>
    <input type="submit" value="Log Session"/>
    <button>Email Invoice</button>
<br/>
    <p>Your previous sessions with: {this.state.currentClient}</p>
<br/>
<br/>
{/* {this.props.testClient} */}
{ this.showSessions()}
</form>
  </div>
</div>

  );
}
}

