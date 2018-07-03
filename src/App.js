import React, { Component } from 'react';
import Application from "./Application"
import Login from './login'
import NavBar from './navBar'
import Profile from './profile'
import "./App.css"
import UserRatings from './userRatings'
import {ExpandMovie} from './ExpandMovie'
import Trending from "./trending"
import NowPlaying from "./nowplaying"
import PopularMovies from "./popularmovies"
import Home from "./home"

class App extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      activeUser: sessionStorage.getItem("activeUser"),
      currentVeiw: "",
      userInfo: undefined,
      expandMovie: ExpandMovie
      }}

      setActiveUser = function (val){
        if (val === this.state.activeUser){
          fetch(`http://localhost:5342/users/${val}`)
          .then(result => result.json())
          .then(result => this.setState({ userInfo: val, currentVeiw: "home"}))
        }
        else if (val !== null) {
          // when given a value, add to login info to storage and move to main page
          sessionStorage.setItem("activeUser", val.id)
          this.setState({currentVeiw: "home", activeUser: val.id, userInfo: val })
        }
        else {
          //otherwise remove login information from storage and direct to login veiw
          sessionStorage.removeItem("activeUser")
          this.setState({activeUser: val})
          this.veiwChanger(val)
        }
      }.bind(this)

      veiwChanger = function (val) {
        //selects page to display
        if (this.state.currentVeiw !== val) {
          document.getElementsByTagName("Body")[0].setAttribute("background", '')
          this.setState({ currentVeiw: val})
        }
      }.bind(this)
  
      view = function (){
        if (sessionStorage.getItem("activeUser") === null) {
          //send to login if no user stored
          return(<Login setActiveUser={this.setActiveUser}/>)
        }
        else if(this.state.userInfo === undefined){
          this.setActiveUser(sessionStorage.getItem("activeUser"))
        }
        else {
          //given input, display designated page
              switch(this.state.currentVeiw){
                  case "application":
                  return <Application activeUser={this.state.activeUser}/>
                  case "trending":
                  return <Trending activeUser={this.state.activeUser}/>
                  case "nowPlaying":
                  return <NowPlaying activeUser={this.state.activeUser}/>
                  case "popularMovies":
                  return <PopularMovies activeUser={this.state.activeUser}/>
                  case "login":
                  return <Login setActiveUser={this.setActiveUser}/>
                  case "home":
                  return <Home userInfo={this.state.userInfo} activeUser={this.state.activeUser} setActiveUser={this.setActiveUser}/>
                  case "userRatings":
                  return <UserRatings userInfo={this.state.userInfo} setActiveUser={this.setActiveUser} />
                  case "profile":
                  return <Profile setActiveUser={this.setActiveUser} activeUser={this.setActiveUser} userInfo={this.state.userInfo}/>
              }
          }
        }.bind(this)

        

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
