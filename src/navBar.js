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
    
    navDisplay = function () {
        if (this.props.currentVeiw !== "login") {
            return(<div><a href="#" id="application">Home</a> | <a href="#" id="logout" onClick={this.check}>Logout</a></div>)
        }
    }

    render(){
        return (
            <div>{this.navDisplay()}</div>
        )
    }
}

export default NavBar