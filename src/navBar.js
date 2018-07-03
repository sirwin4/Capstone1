import React, {Component} from "react"

class NavBar extends Component {
    constructor(props){
        super(props)
      
    this.state = {
    }
    }

    check = function (e) {
        e.preventDefault()
        this.props.setActiveUser(null)
    }.bind(this)

    veiwer = function (e) {
        e.preventDefault()
        this.props.veiwChanger(e.target.id)
    }.bind(this)
    
    navDisplay = function () {
        if (this.props.currentVeiw !== "login") {
            return(<div className="inlineBlock"><a href="#" id="home" onClick={this.veiwer}>Home</a> | <a href="#" id="application" onClick={this.veiwer}>Search</a> | <a href="#" onClick={this.check}>Logout</a> | <a href="#" id="profile" onClick={this.veiwer}>Profile</a> | <a href="#" id="userRatings" onClick={this.veiwer}>User Ratings</a> | <a href="#" id="trending" onClick={this.veiwer}>Trending</a> | <a href="#" id="nowPlaying" onClick={this.veiwer}>In Theaters</a> | <a href="#" id="popularMovies" onClick={this.veiwer}>Popular Films</a></div>)
        }
    }

    render(){
        return (
            <div>{this.navDisplay()}</div>
        )
    }
}

export default NavBar