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
          expandFunction: ExpandMovie
      }}
    list = ""
    movies = []
    ok = ""
    
    
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
                    <h2 id='${this.movies[index].id}'>${this.movies[index].original_title}</h2>
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
        console.log(this.state.returned)
        })
    return(this.ok)
    }
    
    
    render(){
    return (
        <div dangerouslySetInnerHTML={{__html:this.state.returned}}>      
        </div>
      )
}
}

export default UserRatings