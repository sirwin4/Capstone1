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
          expandedId: "",
          page: 1

      }}
    list = ""
    movies = []
    ok = ""
    
    editing = function () {
        if (this.movies[0] !== undefined){   
        this.movies.forEach(element => {
            document.getElementById(`anchor-${element.id}`).onclick = ExpandMovie.bind(this)
        });
        }
        }.bind(this)
        
    pageChange = function (e) {
        e.preventDefault()
        let pageChange = e.target.id
        if (pageChange === "next"){
            let page = (parseInt(this.state.page) + 1) 
            this.setState({ page: (parseInt(this.state.page) + 1) })
            this.userRatingFunction(page)
            this.editing()
        }
    }.bind(this)
    
    userRatingFunction = function (currentPage) {
    let final = ""
    fetch(`http://localhost:5342/moviesUsers?userId=${this.state.userInfo.id}&_page=${currentPage}`)
    .then(result => result.json())
    .then(result => {
        if (result !== undefined) {
            return(result)
        }
        else {
            window.alert("No Further Ratings")
        }
    })
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
                <p>Rating: ${this.movies[index].rating}</p>
                <p>${this.movies[index].overview}</p>
                <p>${this.movies[index].release_date}</p>
                </div>`
                } 
                return(joined)
            })
            .then(result=>{
                this.setState({ returned:result })
            })
            .then(result => {this.editing()})
        })
    })
}.bind(this)

    initialUserRatingFunction = function () {
        let page = this.state.page
        this.userRatingFunction(page)
    }.bind(this)

    // componentWillMount(){
        
    // }
    componentDidMount(){
        this.initialUserRatingFunction()
    }
    
    
    render(){
    return (
        <div>
         {this.state.components}
        <div id="userRatings" dangerouslySetInnerHTML={{__html:this.state.returned}}></div>
        <button id="next" onClick={this.pageChange}>Show More</button>
        </div>
    )
}
}

export default UserRatings