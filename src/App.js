import React, { Component } from 'react';
import './App.css';
import {ExpandMovie} from './ExpandMovie'


class App extends Component {
  constructor(props){
    super(props)
  
  this.state = {
    term: "",
    movie: [],
    overview: [],
    release: [],
    element: [],
    filmId: [],
    confirmId: "",
    components: ""
  }}

  handleChange = function (event) {
    this.setState({term: event.target.value})
  }.bind(this)
  
  getMovie = function (event) {
    event.preventDefault()
    this.setState({
      movie: [],
      overview: [],
      release: [],
      element: [],
      filmId: []
    })
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=d1828a2d110346eee0cfdd42f858ba1e&language=en-US&query=${encodeURI(this.state.term)}&page=1&include_adult=false`) 
    .then(result => result.json())
    .then(result => {
      if (result.total_results !== 0){
        let movieArray =[]
        let overviewArray =[]
        let releaseArray = []
        let filmIdArray = []
        for (let index = 0; index < 5; index++) {
          if(index <= result.total_results && result.results[index] !== undefined){
            movieArray.push(result.results[index].original_title)
            overviewArray.push(result.results[index].overview)
            releaseArray.push(result.results[index].release_date)
            filmIdArray.push(result.results[index].id)
          }
        }
        this.setState({
          movie: movieArray,
          overview: overviewArray,
          release: releaseArray,
          filmId: filmIdArray
        })
      }
      else {
        this.setState({
          movie: [""],
          overview: ["Please Revise Search"],
          release: [""]
        }
        )
      }
    }
    )
    .then(result => {
      if(this.state.movie.length === this.state.overview.length && this.state.overview.length === this.state.release.length){
      for (let index = 0; index < this.state.movie.length; index++) {
        this.state.element.push(
          <div>
            <h2 id={`${this.state.filmId[index]}`}><a href="#" onClick={ExpandMovie}>{this.state.movie[index]}</a></h2>
            <p>{this.state.overview[index]}</p>
            <p>{this.state.release[index]}</p>
            <div>{this.state.components}</div>
          </div>
        )
      }
      sessionStorage.setItem("login", "1")
      this.forceUpdate()
    }
  })
  }.bind(this)
  


  render() {
    return (
      <div className="App">
        <form onSubmit={this.getMovie}>
        <input
          type="text"
          placeholder="Enter your search term here"
          onChange={this.handleChange}
        />
        <button type="Submit">Submit</button>
        </form>
        <div>{this.state.element[0]}{this.state.element[1]}{this.state.element[2]}{this.state.element[3]}{this.state.element[4]}</div>
        <div></div>
      </div>
    );
  }
}

export default App;
