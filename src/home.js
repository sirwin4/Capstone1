import React, { Component } from 'react'

class Home extends Component {
    constructor(props){
      super(props)
      this.state =
      {
          fName: "",
          lName: ""
      }
    }


    getUserInfo = function () {
        fetch(`http://localhost:5342/users/${this.props.activeUser}`)
        .then(result => result.json())
        .then(result => this.setState({ fName: result.fName, lName: result.lName}))
    }.bind(this)

    componentDidMount() {
        this.getUserInfo()
    }

    render() {
        return(
        <div>
        <h1>/Screenings/</h1>
        <h3>Welcome, {this.state.fName} {this.state.lName}</h3>
        <p>There are plenty of places to debate what the best movie out there is and every rating you find has it's place in helping you know what the movie brings to the table. Easy enough, right? This is not a movie rating site. A 5/5 here might have a terrible rating on other sites, but that means it makes up for it with all the screen flooding special effects and bass bottoming audio you could want. That is what this site is about.</p>
        </div>
        )
    }
}

export default Home;