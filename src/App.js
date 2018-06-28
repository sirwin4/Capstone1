import React, { Component } from 'react';
import Application from "./Application"
import Login from './login'
import NavBar from './navBar'
import Profile from './profile'
import "./App.css"
import UserRatings from './userRatings'

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
          // when given a value, add to login info to storage and move to main page
          sessionStorage.setItem("activeUser", val.id)
          this.setState({currentVeiw: "application", activeUser: val.id, userInfo: val })
        }
        else {
          //otherwise remove login information from storage and direct to login veiw
          sessionStorage.removeItem("activeUser")
          this.setState({currentVeiw: "login", activeUser: val})
        }
      }.bind(this)

      veiwChanger = function (val) {
        //selects page to display
         this.setState({ currentVeiw: val})
      }.bind(this)
  
      view = function (){
        if (sessionStorage.getItem("activeUser") === null) {
          //send to login if no user stored
          return(<Login setActiveUser={this.setActiveUser}/>)
        }
        else {
          //given input, display designated page
              switch(this.state.currentVeiw){
                  case "application":
                  return <Application activeUser={this.state.activeUser}/>
                  case "login":
                  return <Login setActiveUser={this.setActiveUser}/>
                  case "userRatings":
                  return <UserRatings userInfo={this.state.userInfo} setActiveUser={this.setActiveUser} />
                  case "profile":
                  return <Profile setActiveUser={this.setActiveUser} userInfo={this.state.userInfo}/>
              }
          }
        }
    
      render() {
        
          return (
            
              <article>
                <h2 className="inlineBlock">5CR33N1NGS</h2>
                <NavBar veiwChanger={this.veiwChanger} setActiveUser={this.setActiveUser} currentVeiw={this.state.currentVeiw}/>
                  {this.view()}
              </article>
          )
      }
    }

export default App;
