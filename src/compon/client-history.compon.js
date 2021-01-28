import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";



const SessionDataList = props => (
<tr>
<td>{props.session.currentClient}</td>
<td>{props.session.sessionDate.substring(0,10)}</td>
<td>{props.session.startTime}</td>
<td>{props.session.sessionLength}</td>
<td>{props.session.sessionPaid ? "Paid" : "Not Paid" }</td>
<td>
    <Link className="btn btn-primary" to={"/edit/"+props.session._id}>Edit</Link> | <a className="btn btn-danger" href="#" onClick = {()=> {props.deleteSession(props.session._id)}}>Delete</a> | <a className="btn btn-primary" href="#" onClick = {() => {props.sessionPaidUpdater(props.session._id)}}>Mark as Paid</a>
</td>
</tr>
);

export default class ClientHistory extends Component {
    constructor(props){
    super(props);
    this.state = {
        sessions: [],
        clients: [],
        user: "",
        userId: 0,
        currentClient: "",
    }
    this.onChangeClient = this.onChangeClient.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
    this.sessionPaidUpdater = this.sessionPaidUpdater.bind(this)
    // this.testerfunction = this.testerfunction.bind(this);
    }
    

// componentDidMount(){
//     axios.get("http://localhost:5000/users/locker", {withCredentials: true})
// .then(response => {
//     console.log(response);
//     this.setState({
//       user: response.data.username,
//       userId: response.data.userid,
//     })

//     axios.get("http://localhost:5000/clients/")
// .then(response => {
//     console.log("set clients ran")
//     console.log(response)
//     this.setState({
//       clients: response.data
//     .filter(clientsthatbelongtocurrentuser => clientsthatbelongtocurrentuser.userId === this.props.testClientID )
//       .map(client => client.firstName + " " + client.lastName),
//       currentClient: response.data[0].currentClient
//     })
// })

//     axios.get("http://localhost:5000/sessions/")
//     .then(response => {
//         console.log("set sessions ran")
//     this.setState({sessions: response.data})
//     })
//     .catch((error) => {
//             console.log(error);
//             }) 
// })
// }



async componentDidMount() {

    // Make requests
    const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
      axios.get(`http://localhost:5000/users/locker`,{withCredentials: true}),
      axios.get("http://localhost:5000/clients/"),
      axios.get("http://localhost:5000/sessions/")
    ]);
  
    // Update state once with all 3 responses
    this.setState({
        user: firstResponse.data.username,
        userId: firstResponse.data.userid,
        clients: secondResponse.data
                .filter(clientsthatbelongtocurrentuser => clientsthatbelongtocurrentuser.userId === firstResponse.data.userid )
                  .map(client => client.firstName + " " + client.lastName),
                  currentClient: secondResponse.data[0].currentClient,
        sessions: thirdResponse.data
    });
  
  }

onChangeClient(e){
    this.setState({
      currentClient: e.target.value,
    })
  }

showSessionList(){
    return this.state.sessions
    .filter(user => user.user === this.state.user)
    .filter(client => client.currentClient === this.state.currentClient)
    .map(currentSession => {
        return <SessionDataList session={currentSession} deleteSession={this.deleteSession} sessionPaidUpdater={this.sessionPaidUpdater}  key={currentSession._id} />
    })
}



deleteSession(id){
let confirmation = window.confirm("Please confirm you would like to delete this sessions.")
if (confirmation === true){
    axios.delete("http://localhost:5000/sessions/"+id)
    .then(res => console.log(res.data));
    this.setState({
        sessions: this.state.sessions.filter(el => el._id !== id)
    })
} else {
    window.location = "/"
}
}

sessionPaidUpdater(id){
// console.log("poop")
axios.get("http://localhost:5000/sessions/"+id)
.then(res => {
    // console.log(res.data.currentClient);
        const tempuser = this.props.testClient;
        const tempuserId = this.props.testClientID
        const tempcurrentClient = res.data.currentClient;
        const tempsessionLength = res.data.sessionLength;
        const tempstartTime = res.data.startTime;
        // const tempsessionDate = Date.parse(res.data.sessionDate);
        const tempsessionDate = new Date(res.data.sessionDate)
        // const tempsessionPaid = res.data.sessionPaid; 
        // console.log(tempsessionPaid);
        
       
            const testdata = {
              user :  tempuser,
              userId: tempuserId,
              currentClient: tempcurrentClient,
              sessionLength: tempsessionLength,
              startTime: tempstartTime,
              sessionDate: tempsessionDate,
              sessionPaid: true,  
            }
            console.log(testdata);
            axios.post("http://localhost:5000/sessions/update/"+id, testdata)
            .then(window.location = "/")
        })
}


render(){
    return(
        <div>
        <h3>Hi {this.state.user} | {this.state.userId}  , Your Session History with {this.state.currentClient}</h3>
        <label>Pick Client</label>
        <select required value={this.state.currentClient} onChange={this.onChangeClient}>
    <option key="default" value="default">Pick Client</option>
    {this.state.clients.map(function(client){
    return <option key={client} value={client}>
    {client}
    </option>
    })}
    </select>
        <table className = "table">
            <thead className= "thead-light">
            <tr>
            <th>Client Name</th>
            <th>Session Date</th>
            <th>Session State Time</th>
            <th>Session Length</th>
            <th>Paid?</th>
            <th>Actions (Edit/Delete/Mark As Paid)</th>
            </tr>
            </thead>
            <tbody>
            {this.showSessionList()}
            </tbody>
        </table>
        
        </div>
    )
}

}