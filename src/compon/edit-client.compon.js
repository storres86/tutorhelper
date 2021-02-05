import React, {Component} from "react";
import axios from "axios"

export default class EditClient extends Component{
    constructor(props){
        super(props)
        this.state = {
            clients: [],
            usesrId: "",
            firstName : "",
            lastName : "",
            email : "",
            number :"",
            currentClient: "",
            clientId: "",
            user:"",
            clientFullName: "",
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName=this.onChangeLastName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangeClient = this.onChangeClient.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
    }

    componentDidMount(){
        // axios.get("http://localhost:5000/clients/" +this.props.match.params.id)
        axios.get("https://storres86.github.io/clients/" +this.props.match.params.id)
        .then(response => {
            this.setState({
                // id: response.data._id,
                user: response.data.username,
                userId: response.data.userid,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                number: response.data.number,
                clientFullName: response.data.firstName + " " + response.data.lastName
            })
        })
        .catch(function(error){
            console.log(error);
        })
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

    onChangeClient(e){
            this.setState({
                currentClient: e.target.value,
         })
      }

      deleteClient(id){
          console.log("delete client ran");
          let confirmation = window.confirm("Please confirm that you would like to delete this client")
          if (confirmation === true){
            //   axios.delete("http://localhost:5000/clients/"+id)
            axios.delete("https://storres86.github.io/clients/"+id)
              .then(res => console.log(res.data));
              window.location = "/"
            
          } else {
              window.location = "/editClient/"+this.props.match.params.id
          }
      }


    onSubmit(e){
        e.preventDefault();

        
        const newClientData = {
            user: this.state.user,
            userID: this.state.userID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            number: this.state.number,
            userId: this.state.userId,
            clientFullName: this.state.clientFullName,
        }
       
        let confirmation = window.confirm("Please confirm that you would like to update this client")

        if (confirmation === true){
            // axios.post("http://localhost:5000/clients/update/"+this.props.match.params.id,newClientData)
            axios.post("https://storres86.github.io/clients/update/"+this.props.match.params.id,newClientData)
            .then(window.location="/history")
        } else {
            // window.location = "/editClient/"+this.props.match.params.id
            this.props.history.push("/editClient/"+this.props.match.params.id)
        }

        
        // .catch(error => alert("Failed to update client" + error))
        

        // console.log(newClientData);
        // console.log(this.props.match.params.id);

        
    }


render(){
    return(
        <div>
<h1>Edit Client</h1>
<form onSubmit={this.onSubmit}>
{/* <label>Pick Client:</label>
    <select required value={this.state.currentClient} onChange={this.onChangeClient}>
    <option key="default" value="default">Pick Client</option>
    {this.state.clients.map(function(client){
    return <option key={client} value={client}>
    {client}
    </option>
    })}
    </select> */}

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
    <input type="submit" value="Edit Client" className = "btn btn-primary"/>
    <input type="button" onClick={() => this.deleteClient(this.props.match.params.id)} value="Delete Client" className = "btn btn-danger"/>
</div>
</form>
{this.state._id}

        </div>
    )
}

}