import React, {Component} from "react";
import axios from "axios"


export default class CreateClient extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: "",
            userId: "",
            firstName : "",
            lastName : "",
            email : "",
            number :"",
            clientFullName: "",
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName=this.onChangeLastName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/users/locker`,{withCredentials: true})
        .then(response => {
            this.setState({
                // id: response.data._id,
                user: response.data.username,
                userId: response.data.userid,
            })
        })
        .catch(function(error){
            console.log(error);
        })

        // this.setState({
        //     user: this.props.testClient,
        //     userId: this.props.testClientID, 
        // })
    }

    onChangeFirstName(e){
        this.setState({
            firstName: e.target.value,
            clientFullName: e.target.value + " " + this.state.lastName
        })
        // console.log(this.state.firstName);
    }

    onChangeLastName(e){
        this.setState({
        lastName: e.target.value,
        clientFullName: this.state.firstName + " " + e.target.value   
        })
        // console.log(this.state.lastName);
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
        // console.log(this.state.email);
    }

    onChangeNumber(e){
        this.setState({
            number: e.target.value
        })
        // console.log(this.state.number);
    }

    onSubmit(e){
        e.preventDefault();

        // this.setState({clientFullName: this.state.firstName + " " + this.state.lastName,
        // },console.log(this.state.clientFullName))

        const newClientData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            number: this.state.number,
            user: this.state.user,
            userId: this.state.userId,
            clientFullName: this.state.clientFullName,
        }
        alert("A new client has been added");

        console.log(this.state.clientFullName);
        

        axios.post("http://localhost:5000/clients/add",newClientData)
        .then(res => console.log(res.data))

        // console.log(newClientData);

        window.location = "/"
    }

render(){
    return(
<div>
<h1>Create New Client | {this.state.user}, {this.state.userId}</h1>
<form onSubmit={this.onSubmit}>
<div className= "form-group">
    <label>First Name</label>
    <input type="text"
    required
    className="form-control"
    value={this.state.firstName}
    onChange={this.onChangeFirstName}
    />
</div>
<div className= "form-group">
    <label>Last Name</label>
    <input type="text"
    required
    className="form-control"
    value={this.state.lastName}
    onChange={this.onChangeLastName}
    />
</div>
<div className= "form-group">
    <label>Email</label>
    <input type="text"
    required
    className="form-control"
    value={this.state.email}
    onChange={this.onChangeEmail}
    />
</div>
<div className= "form-group">
    <label>Phone Number</label>
    <input type="text"
    required
    className="form-control"
    value={this.state.number}
    onChange={this.onChangeNumber}
    />
</div>
<div className="form-group">
    <input type="submit" value="Create New Client" className = "btn btn-primary"/>
</div>
</form>

</div>
    )
}


}
