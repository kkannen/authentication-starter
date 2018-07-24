import React, { Component } from 'react';
import './App.css';
import Authentication from "./components/Authentication"
import AuthenticatedContent from './components/AuthenticatedContent';

class App extends Component {
  state = {
    authenticationError: "",
    authenticated: false,
    currentUser: null
  };

  handleCreateAccount = (credentials) => {
    const {firstName, lastName, email, phone, password, confirmPassword} = credentials;
    if(!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()){
        this.setState({
          authenticationError : "Must provide all fields"
        });
    } else if(password !== confirmPassword) {
      this.setState({
        authenticationError: "Passwords do not Match"
      })
    } else {
      fetch("/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data)
        console.log(data)
        if(data["error"]) {
          return this.setState({authenticationError: data["error"]})
        }
        const {token} = data.token;
        localStorage.setItem("token", token);
        this.setState({
          authenticationError: "",
          authenticated: data.token,
          currentUser: data.u
        });
      });
    }
  }

  handleLogIn = (credentials) => {
    const {email, password} = credentials;
    if(!email.trim() || !password.trim()) {
      this.setState({
        authenticationError: 'Must Provide All Fields'
      });
    } else {
      fetch("/sessions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then((response) => {
        return response.json();
        }).then((data) => {
          if(data["error"]){
            return this.setState({authenticationError: data["error"]})
          }
          const { token } = data.token;
          localStorage.setItem('token', token);
          this.setState({
            authenticationError: '',
            authenticated: data.token,
            currentUser: data.user
          });
        });
    }
  }

  handleLogOut = () => {
    localStorage.removeItem("token");
    this.setState({
      authenticated: false,
      currentUser: null,
    });
  };

  renderAuthentication = () => {
    return (
      <Authentication
        error={this.state.authenticationError}
        onCreateAccount={this.handleCreateAccount}
        onLogIn={this.handleLogIn} />
    )
  }

  render() {
    let renderAuthOrApp;
    if(this.state.authenticated){
      renderAuthOrApp = (<AuthenticatedContent onLogOut={this.handleLogOut} currentUser={this.state.currentUser} />)
    } else {
      renderAuthOrApp = this.renderAuthentication()
    }
    return (
      <div className="App">
        {renderAuthOrApp}
      </div>
    );
  }
}

export default App;
