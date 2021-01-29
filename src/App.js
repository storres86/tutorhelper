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
import LoginPage from "./compon/login"


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
    <LoginPage {...props} currentUserUpdater={this.currentUserUpdater} />
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
