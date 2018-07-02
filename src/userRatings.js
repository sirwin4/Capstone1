import React, { Component } from 'react';
import {ExpandMovie} from './ExpandMovie'



class UserRatings extends Component {
    constructor(props){
      super(props)
      this.state =
      {
          userInfo: this.props.userInfo,
          components: "",
          returned: "",
          idList: "",
          expandedId: ""

      }}
    list = ""
    movies = []
    ok = ""
    
    editing = function () {
        this.movies.forEach(element => {
            console.log(document.getElementById(`anchor-${element.id}`))
            document.getElementById(`anchor-${element.id}`).onclick = ExpandMovie.bind(this)
            
        });
        }.bind(this)
        
    
    componentDidMount(){
        let final = ""
        fetch(`http://localhost:5342/moviesUsers?userId=${this.state.userInfo.id}`)
        .then(result => result.json())
        .then(result => {
            this.list = result
            })
        .then(result =>{
            this.list.forEach(element => {
                fetch(`https://api.themoviedb.org/3/movie/${element.movieId}?api_key=d1828a2d110346eee0cfdd42f858ba1e`)
                .then(result => result.json())
                .then(result => {
                    this.movies.push(result)
                }
                )
                .then(result =>{
                    let joined = ""
                    for (let index = 0; index < this.movies.length; index++) {
                    joined += 
                    `
                    <div id='div-${this.movies[index].id}'>
                    <h2 id='${this.movies[index].id}'><a id='anchor-${this.movies[index].id}' href="#">${this.movies[index].original_title}</a></h2>
                    <p>Rating: ${this.list[index].rating}</p>
                    <p>${this.movies[index].overview}</p>
                    <p>${this.movies[index].release_date}</p>
                    </div>`
                    } 
                    return(joined)
                })
                .then(result=>{
                    this.setState({ returned:result })
                })
            })
        })
    this.editing
    }
    
    
    render(){
    return (
        <div>
         {this.state.components}
        <p><a href="#" onClick={this.editing}>Edit</a></p>
        <div id="userRatings" dangerouslySetInnerHTML={{__html:this.state.returned}}></div>    
        </div>
    )
}
}

export default UserRatings