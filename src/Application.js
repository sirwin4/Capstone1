import React, { Component } from 'react';
import {ExpandMovie} from './ExpandMovie'


class Application extends Component {
    constructor(props){
      super(props)
    
      this.state = {
        term: "",
        movie: [],
        overview: [],
        release: [],
        element: [],
        filmId: [],
        components: "",
        indexer: 0,
        indexer2: 1,
        indexer3: 2,
        indexer4: 3,
        indexer5: 4,
        indexerReference: 1,
        expandedId: ""
      }}
     

      handleChange = function (event) {
        this.setState({term: event.target.value, indexer: 0})
      }.bind(this)
      
      getMovie = function (event) {
        if (event){
        event.preventDefault()
        this.setState({
            movie: [],
            overview: [],
            release: [],
            element: [],
            filmId: [],
            confirmId: "",
            components: "",
            indexer: 0,
            indexer2: 1,
            indexer3: 2,
            indexer4: 3,
            indexer5: 4,
            indexerReference: 1
          })}
          this.setState({
            components: ""
          })
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=d1828a2d110346eee0cfdd42f858ba1e&language=en-US&query=${encodeURI(this.state.term)}&page=${this.state.indexerReference}&include_adult=false`) 
        .then(result => result.json())
        .then(result => {
            if (this.state.indexer > 40 || this.state.overview[0] === "Refine Search") {
                this.setState({
                  movie: [""],
                  overview: ["Refine Search"],
                  release: [""],
                  element: [""],
                  filmId: [""],
                  components: "",
                  indexer: 0,
                  indexer2: 1,
                  indexer3: 2,
                  indexer4: 3,
                  indexer5: 4
                })
            }
          else if (result.total_results !== 0){
            let numerator = this.state.indexer - ((this.state.indexerReference - 1) * 25)
            let secondIndexer = numerator + 5
            
            for (let index = numerator; index <= secondIndexer; index++) {
              if(result.results[index] !== undefined){
                this.state.movie.push(result.results[index].original_title)
                this.state.overview.push(result.results[index].overview)
                this.state.release.push(result.results[index].release_date)
                this.state.filmId.push(result.results[index].id)
              }
            }
          }
          else {
            this.setState({
              movie: [""],
              overview: ["Please Revise Search"],
              release: [""],
              indexer: 0,
              indexer2: 1,
              indexer3: 2,
              indexer4: 3,
              indexer5: 4
            }
            )
          }
        }
        )
        .then(result => {

          if(this.state.movie.length === this.state.overview.length && this.state.overview.length === this.state.release.length){
          for (let index = this.state.indexer; index < this.state.indexer + 5; index++) {
            this.state.element.push(
              <div id={`div-${this.state.filmId[index]}`}>
                <h2 id={`${this.state.filmId[index]}`}><a href="#" onClick={ExpandMovie.bind(this)}>{this.state.movie[index]}</a></h2>
                <p>{this.state.overview[index]}</p>
                <p>{this.state.release[index]}</p>
                <div>{this.state.components}</div>
              </div>
            )
          }
          if (this.state.indexer !== 0 && this.state.indexer % 20 === 0){
              this.setState({ indexerReference: this.state.indexerReference + 1 })
          }
          this.forceUpdate()
        }
      })
      }.bind(this)
      
      showMore = function (e) {
        e.preventDefault()
        const newIndexer = this.state.indexer + 5
        const newIndexer2 = this.state.indexer2 + 5
        const newIndexer3 = this.state.indexer3 + 5
        const newIndexer4 = this.state.indexer4 + 5
        const newIndexer5 = this.state.indexer5 + 5
        this.getMovie()
        this.setState({
            indexer: newIndexer,
            indexer2: newIndexer2,
            indexer3: newIndexer3,
            indexer4: newIndexer4,
            indexer5: newIndexer5
        })
      }.bind(this)

      showLess = function (e) {
        e.preventDefault()
        if (this.state. indexer > 0) {
        const updatedIndexer = this.state.indexer - 5
        this.setState({indexer: updatedIndexer})
        this.getMovie()
        }
      }.bind(this)
    
    
      render() {
        debugger
        if (this.state.components !== ""){document.getElementById(`div-${this.state.expandedId}`).append(this.state.components)}
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
            <div>{this.state.components}</div>
            <div>{this.state.element[this.state.indexer]}</div>
            <div>{this.state.element[this.state.indexer2]}</div>
            <div>{this.state.element[this.state.indexer3]}</div>
            <div>{this.state.element[this.state.indexer4]}</div>
            <div>{this.state.element[this.state.indexer5]}</div>
            <form onSubmit={this.showMore}>
            <button type="Submit">Next Page</button>
            </form>
            <form onSubmit={this.showLess}>
            <button type="Submit">Last Page</button>
            </form>
          </div>
        );
      }
    }
  
  export default Application;