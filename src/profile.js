import React, {Component} from "react"

class Profile extends Component {
    constructor(props){
        super(props)
      
    this.state = {
        user: this.props.userInfo.user,
        fName: this.props.userInfo.fName,
        lName: this.props.userInfo.lName,
        email: this.props.userInfo.email,
        password: this.props.userInfo.password,
        deletePassword: ""
    }
    }

    handleChange = function (e) {
        e.preventDefault()
        //stores changes in proper location when info added to input fields based jsx id
        let userValue = e.target.id
        switch (userValue){
            case "newFName":
                this.setState({ fName: e.target.value })
                break
            case "newLName":
                this.setState({ lName: e.target.value })
                break
            case "newEmail":
                this.setState({ email: e.target.value })
                break
            case "newPassword":
                this.setState({ password: e.target.value })
                break
            case "previousPassword":
                this.setState({ deletePassword: e.target.value })
        }
    }.bind(this)

    deleteAccount = function (e) {
        e.preventDefault()
        //remove account given correct information is provided
        if (this.state.deletePassword === this.props.userInfo.password) {
        fetch(`http://localhost:5342/users/${this.props.userInfo.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(this.props.setActiveUser(null))
        }
    }.bind(this)

    edit = function (e){
        if (e) {
            e.preventDefault()
            //pull account info from db and create prefilled fields with user info to be edited
            this.setState({ user: (
                <div>
                <form onSubmit={this.updateInfo}>
                <h2>Update Account</h2>
                <input id="newFName" type="text" placeholder={`${this.props.userInfo.fName}`} onChange={this.handleChange}/> 
                <input id="newLName" type="text" placeholder={`${this.props.userInfo.lName}`} onChange={this.handleChange}/>
                <input id="newEmail" type="text" placeholder={`${this.props.userInfo.email}`} onChange={this.handleChange}/>
                <input id="newPassword" type="text" placeholder="New Password" onChange={this.handleChange}/>
                <button  type="Submit">Submit</button>
                </form>
                <form onSubmit={this.deleteAccount}>
                <h2>Delete Account</h2>
                <input onChange={this.handleChange} id="previousPassword" type="text" placeholder="Confirm Password to Delete"/>
                <button type="submit">Delete</button>
                </form>
                </div>
            )})
        }
    }.bind(this)
    updateInfo = function (e) {
        e.preventDefault()
        //sends account updates to json file 
        fetch(`http://localhost:5342/users/${this.props.userInfo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: this.props.id, email: this.state.email, password: this.state.password, fName: this.state.fName, lName: this.state.lName })
        })
        .then(result => result.json())
        .then(result =>{this.props.setActiveUser(result)})
    }.bind(this)

    render(){
        
        return(
            <div>
                <p id="fNameInfo">{this.props.userInfo.fName}</p>
                <p id="lNameInfo">{this.props.userInfo.lName}</p>
                <p id="emailInfo">{this.props.userInfo.email}</p>
                <button onClick={this.edit}>Edit</button>
                <div>{this.state.user}</div>
            </div>
        )}
}
export default Profile