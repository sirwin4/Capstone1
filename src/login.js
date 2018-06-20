import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
      super(props)
    
    this.state = {
        email: "",
        password: "",
        registerEmail: "",
        registerPassword: "",
        fName: "",
        lName: ""
    }}

    handleChange = function (e) {
        const id = e.target.id
        switch(id) {
        case "email":
            this.setState({ email: e.target.value})
        case "registerEmail":
            this.setState({ registerEmail: e.target.value})
        case "registerPassword":
            this.setState({ registerPassword: e.target.value})
        case "password":
            this.setState({ password: e.target.value}) 
         case "fName":
            this.setState({ fName: e.target.value})
        case "lName":
            this.setState({ lName: e.target.value})
        }
    }.bind(this)

    login = function (e) {
        e.preventDefault()
        fetch(`http://localhost:5342/users?email=${this.state.email}&password=${this.state.password}`)
        .then(result => result.json())
        .then(result => {
                if (result.length){
                    this.props.setActiveUser(result[0].id)
                }
                else {
                    window.alert("Sorry, we don't recognize this login!")
                }
            })
    }.bind(this)

    register = function (e) {
        e.preventDefault()
        fetch(`http://localhost:5342/users?${this.state.registerEmail}`)
        .then(result => result.json)
        .then(result => {
            if (!result.length) {
                fetch(`http://localhost:5342/users`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.registerEmail,
                        fName: this.state.fName,
                        lName: this.state.lName,
                        password: this.state.registerPassword
                    })
                })
                .then(result => result.json())
                .then(result => {
                    this.props.setActiveUser(result.id)
                })
            }
            else {
                window.alert("This Email is already in use")
            }

})

    }.bind(this)

    render(){
        return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={this.login}>
                    <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    onChange={this.handleChange}
                    />
                    <input
                    id="password"
                    type="text"
                    placeholder="Password"
                    onChange={this.handleChange}
                    />
                    <button type="Submit">Submit</button>
                </form>
            </div>
            <div>
            <h2>Register</h2>
            <form onSubmit={this.register}>
                <input
                id="registerEmail"
                type="text"
                placeholder="Email"
                onChange={this.handleChange}
                />
                <input
                id="fName"
                type="text"
                placeholder="First Name"
                onChange={this.handleChange}
                />
                <input
                id="lName"
                type="text"
                placeholder="Last Name"
                onChange={this.handleChange}
                />
                <input
                id="registerPassword"
                type="text"
                placeholder="Password"
                onChange={this.handleChange}
                />
                <button type="Submit">Submit</button>
            </form>
            </div>
        </div>
        )
    }

}

export default Login