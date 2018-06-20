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
            return(<div><a href="#" id="application" onClick={this.veiwer}>Home</a> | <a href="#" onClick={this.check}>Logout</a> | <a href="#" id="profile" onClick={this.veiwer}>Profile</a></div>)
        }
    }

    render(){
        return (
            <div>{this.navDisplay()}</div>
        )
    }
}

export default NavBar