import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

//the var session is related to the prop inside of the SessionDataList Element


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

export default class SessionList extends Component {
    constructor(props){
    super(props);
    this.state = {sessions: []}
    this.sessionPaidUpdater = this.sessionPaidUpdater.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
    }
    

componentDidMount(){
    // axios.get("http://localhost:5000/sessions/")
    axios.get("https://storres86.github.io/sessions/")
    .then(response => {
    this.setState({sessions: response.data})
    })
    .catch((error) => {
            console.log(error);
            })    
}

showSessionList(){
    return this.state.sessions
    .filter(user => user.user == this.props.user)
    .filter(client => client.currentClient == this.props.currentClient)
    .map(currentSession => {
        return <SessionDataList session={currentSession} sessionPaidUpdater={this.sessionPaidUpdater} deleteSession={this.deleteSession} key={currentSession._id} />
    })
}

sessionPaidUpdater(id){
    // console.log("poop")
    // axios.get("http://localhost:5000/sessions/"+id)
    axios.get("https://storres86.github.io/sessions/"+id)
    .then(res => {
        // console.log(res.data.currentClient);
            const tempuser = res.data.user;
            const tempuserId = res.data.userId;
            const tempcurrentClient = res.data.currentClient;
            const tempsessionLength = res.data.sessionLength;
            const tempstartTime = res.data.startTime;
            // const tempsessionDate = Date.parse(res.data.sessionDate);
            const tempsessionDate = new Date(res.data.sessionDate)
            const tempsessionPaid = res.data.sessionPaid; 
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
                // axios.post("http://localhost:5000/sessions/update/"+id, testdata)
                axios.post("https://storres86.github.io/sessions/update/"+id, testdata)
                .then(window.location = "/createSession")
            })
    }

    deleteSession(id){
        let confirmation = window.confirm("Please confirm you would like to delete this sessions.")
        if (confirmation === true){
            // axios.delete("http://localhost:5000/sessions/"+id)
            axios.delete("https://storres86.github.io/sessions/"+id)
            .then(res => console.log(res.data));
            this.setState({
                sessions: this.state.sessions.filter(el => el._id !== id)
            })
        } else {
            window.location = "/createSession"
        }
        }


render(){
    return(
        <div>
        <h3>Hi {this.props.user} , Your Session History with {this.props.currentClient}</h3>
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