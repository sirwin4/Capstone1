import React, { Component } from 'react';
import Application from "./Application"
import Login from './login'
import NavBar from './navBar'
import Profile from './profile'

class App extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      activeUser: sessionStorage.getItem("activeUser"),
      currentVeiw: "login",
      userInfo: ""
      }}

      setActiveUser = function (val){
        if (val !== null) {
          sessionStorage.setItem("activeUser", val.id)
          this.setState({currentVeiw: "application", activeUser: val.id, userInfo: val })
        }
        else {
          sessionStorage.removeItem("activeUser")
          this.setState({currentVeiw: "login", activeUser: val})
        }
      }.bind(this)

      veiwChanger = function (val) {
         this.setState({ currentVeiw: val})
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
                  case "profile":
                  return <Profile setActiveUser={this.setActiveUser} userInfo={this.state.userInfo}/>
              }
          }
        }
    
      render() {
          return (
            
              <article>
                <h2>5CR33N1NGS</h2>
                <NavBar veiwChanger={this.veiwChanger} setActiveUser={this.setActiveUser} currentVeiw={this.state.currentVeiw}/>
                  {this.view()}
              </article>
          )
      }
    }

export default App;
