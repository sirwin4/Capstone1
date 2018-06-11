import React, { Component } from 'react';
import './App.css';
import SearchResult from './searchResult'


class App extends Component {
  state = {
    movie: "",
    overview: "",
    release: ""
  }
  
  getMovie =  () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=d1828a2d110346eee0cfdd42f858ba1e&language=en-US&query=Red&page=1&include_adult=false`) //${SearchResult}
    .then(result => result.json())
    .then(result => {
      this.setState({
        movie: result.results[0].original_title,
        overview: result.results[0].overview,
        release: result.results[0].release_date

      })
    })
}

componentDidMount () {
  this.getMovie()
}

  render() {
    return (
      <div className="App">
        <h2>{this.state.movie}</h2>
        <p>{this.state.overview}</p>
        <p>{this.state.release}</p>
      </div>
    );
}
}

export default App;
