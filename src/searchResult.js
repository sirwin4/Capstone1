export const SearchResult = function (e) {
    let id = ""
    console.log(e.target)
    if (e) {
    id = e.target.id
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d1828a2d110346eee0cfdd42f858ba1e`)
    .then(result => result.json())
    .then(result => console.log(result))
    // .then(result => {this.setState({confirmId: [result.id]})})
    }
}.bind(this)