import React, { Component } from 'react';
import {ExpandMovie} from './ExpandMovie'


class NowPlaying extends Component {
    constructor(props){
      super(props)
    
      this.state = {
        term: `movie/popular?api_key=d1828a2d110346eee0cfdd42f858ba1e&language=en-US`,
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
     
      TrendingFunction = function (event) {
        this.setState({term: `movie/popular?api_key=d1828a2d110346eee0cfdd42f858ba1e&language=en-US`, indexer: 0}) 
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
        
        fetch(`https://api.themoviedb.org/3/${encodeURI(this.state.term)}&page=${this.state.indexerReference}&include_adult=false`) 
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
                  indexer5: 4,
                  indexerReference: 1
                })
            }
          else if (result.total_results !== 0){
            let numerator = this.state.indexer - ((this.state.indexerReference - 1) * 20)
            let secondIndexer = numerator + 4
            
            for (let index = numerator; index <= secondIndexer; index++) {
              if(result.results[index] !== undefined ){
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
              </div>
            )
          }
          if (this.state.indexer !== 0 && (this.state.indexer+5) % 20 === 0){
              this.setState({ indexerReference: this.state.indexerReference + 1,
            })
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
        if(this.state.indexer5 === (this.state.element.length - 1)){
        this.getMovie()
        this.setState({
            indexer: newIndexer,
            indexer2: newIndexer2,
            indexer3: newIndexer3,
            indexer4: newIndexer4,
            indexer5: newIndexer5,
            components: ""
        })
        }
        else {
         this.setState({
            indexer: newIndexer,
            indexer2: newIndexer2,
            indexer3: newIndexer3,
            indexer4: newIndexer4,
            indexer5: newIndexer5,
            components: ""
        })
        }
      }.bind(this)

      showLess = function (e) {
        e.preventDefault()
        if (this.state. indexer > 0) {
          const updatedIndexer = this.state.indexer - 5
          const updatedIndexer2 = this.state.indexer2 - 5
          const updatedIndexer3 = this.state.indexer3 - 5
          const updatedIndexer4 = this.state.indexer4 - 5
          const updatedIndexer5 = this.state.indexer5 - 5
          this.setState({
            indexer: updatedIndexer,
            indexer2: updatedIndexer2,
            indexer3: updatedIndexer3,
            indexer4: updatedIndexer4,
            indexer5: updatedIndexer5,
            components: ""
          })
        }
      }.bind(this)
      componentDidMount(){
        this.getMovie()
      }
    
    
      render() {
        
       
   
        return (
          <div className="App">
            <h2>Now Playing</h2>
            {this.state.components}
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
  
  export default NowPlaying;