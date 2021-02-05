import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"



export default class EditSession extends Component{
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
            sessionPaid: false
          }
this.onChangeClient = this.onChangeClient.bind(this);
this.onChangeSessionLength = this.onChangeSessionLength.bind(this);
this.onChangeDate = this.onChangeDate.bind(this);
this.onChangeStartTime = this.onChangeStartTime.bind(this)
this.onSubmit = this.onSubmit.bind(this);
    }


async componentDidMount() {

  // Make requests
  const [firstResponse, secondResponse] = await Promise.all([
    // axios.get("http://localhost:5000/users/locker", {withCredentials: true}),
    // axios.get("http://localhost:5000/sessions/" + this.props.match.params.id)
    axios.get("https://storres86.github.io/users/locker", {withCredentials: true}),
    axios.get("https://storres86.github.io/sessions/" + this.props.match.params.id)
  ]);

  // Update state once with all responses
  this.setState({
      user: firstResponse.data.username,
      userId: firstResponse.data.userid,
      currentClient: secondResponse.data.currentClient,
      sessionLength: secondResponse.data.sessionLength,
      startTime: secondResponse.data.startTime,
      sessionDate: new Date(secondResponse.data.sessionDate),

  });

}




onChangeClient(e){
    this.setState({
      currentClient: e.target.value,
    })
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

  onSubmit(e){
   
    e.preventDefault();
    const newSessionDataPackage = {
      user: this.state.user,
      userId: this.state.userId,
      currentClient: this.state.currentClient,
      sessionLength: this.state.sessionLength,
      startTime: this.state.startTime,
      sessionDate: this.state.sessionDate,
      sessionPaid: this.state.sessionPaid,
    }
    console.log(newSessionDataPackage);
    
    // axios.post("http://localhost:5000/sessions/update/"+this.props.match.params.id, newSessionDataPackage)
    axios.post("https://storres86.github.io/sessions/update/"+this.props.match.params.id, newSessionDataPackage)
    .then(alert("Session has been updated"))
    // .then(<Redirect to='/history' />)
    // .then(alert("Thank you for your time"))
    // .catch(alert("Error: 400, failed to add session"))
  
    window.location = "/history"
 
     
    // this.props.history.replace("/history")
    // this.props.history.replace("/history")
  }
   
   


render(){
    return(
        <div>
<form onSubmit={this.onSubmit}>
    <h3>Edit Session {this.state.user} | {this.state.userId}</h3>
    {/* <label>Client:</label>
    <select required value={this.state.currentClient} onChange={this.onChangeClient}>
    <option key="default" value="default">Pick New Client</option>
    {this.state.clients.map(function(client){
    return <option key={client} value={client}>
    {client}
    </option>
    })}
    </select> */}
<br/>
    <label>Pick New TimeFrame:</label>
    <select required onChange={this.onChangeSessionLength} value={this.state.sessionLength} >
    <option>Time Frame Options</option>
    <option>30 Mins</option>
    <option>1 Hour</option>
    <option>2 Hours</option>
    <option>Custom</option>
    </select>
<br/>
    <label>New Session Date:</label>
    <DatePicker
    selected= {this.state.sessionDate}
    onChange={this.onChangeDate}
    />
<br/>
    <label>New Session Start Time:</label>
    {/* <input type="text" id="start" name="start" required onChange={this.onChangeStartTime}/> */}
    <input type="time" id="start" name="start" value={this.state.startTime} required onChange={this.onChangeStartTime}/>
<br/>
    <p> The current Client is: {this.state.currentClient}</p>
<br/>
    <p> The Length of the session is: {this.state.sessionLength}</p>
<br/>
<p>The current session start time is: {this.state.startTime}</p>
{/* <p>The current date of session is {this.state.sessionDate}</p> */}

<div className="form-group">
<input type="submit" value="Edit Session" className="btn btn-primary"/>
</div>
    
<br/>
<br/>
</form>
        </div>
    )
}
}