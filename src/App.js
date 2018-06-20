import React, { Component } from 'react';
import Application from "./Application"
import Login from './login'
import NavBar from './navBar'

class App extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      activeUser: sessionStorage.getItem("activeUser"),
      currentVeiw: "login"

      }}

      setActiveUser = function (val){
        if (val !== null) {
          sessionStorage.setItem("activeUser", val)
          this.setState({currentVeiw: "application", activeUser: val})
        }
        else {
          sessionStorage.removeItem("activeUser")
          this.setState({currentVeiw: "login", activeUser: val})
        }
      }.bind(this)
  
      view = function (){
        if (sessionStorage.getItem("activeUser") === null) {

          return(<Login setActiveUser={this.setActiveUser}/>)
        }
        else {
              switch(this.state.currentVeiw){
                  case "application":
                  return <Application activeUser={this.state.activeUser}/>
                  case "login":
                  return <Login setActiveUser={this.setActiveUser}/>
              }
          }
        }
    
      render() {
          return (
            
              <article>
                <NavBar setActiveUser={this.setActiveUser} currentVeiw={this.state.currentVeiw}/>
                  {this.view()}
              </article>
          )
      }
    }

export default App;
