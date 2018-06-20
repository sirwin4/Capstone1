import React from 'react'
import {SubmitRating} from './datalogger.js'
import {newRating} from './newRating'

export const ExpandMovie = function (e) {
    let movie = ""
    let identifier = ""
    this.setState({components: ""})
    if (e) {
    identifier = e.target.parentElement.id
    fetch(`https://api.themoviedb.org/3/movie/${encodeURI(identifier)}?api_key=d1828a2d110346eee0cfdd42f858ba1e`)
    .then(result => result.json())
    .then(result => {movie = (
        <div>
        <h2>{result.original_title}</h2>
        <p>{result.overview}</p>
        <p>{result.release_date}</p>
        </div>)}
    )
    .then(result => {return(fetch(`https://api.themoviedb.org/3/movie/${identifier}/credits?api_key=d1828a2d110346eee0cfdd42f858ba1e`))})
    .then(result => result.json())
    .then(result => {
        if (result.cast.length >= 5){
        movie = (
            <div>
                {movie}
                <p>{result.cast[0].name} is {result.cast[0].character}</p>
                <p>{result.cast[1].name} is {result.cast[1].character}</p>
                <p>{result.cast[2].name} is {result.cast[2].character}</p>
                <p>{result.cast[3].name} is {result.cast[3].character}</p>
                <p>{result.cast[4].name} is {result.cast[4].character}</p>
            </div>)
        }
        else {
            movie = (
                <div>
                    {movie}
                    <p>{result.cast[0].name} is {result.cast[0].character}</p>
                </div>)
        }
    })
    .then(result => {return (fetch(`http://localhost:5342/movies?id=${identifier}`))})
    .then(result => result.json())
    .then(result =>{
        if (result[0] !== undefined){
            return(
                <div>
                    {movie}
                    <p>Screening Worthy:</p>
                    <p id={`average${identifier}`}>{result[0].average}</p>
                    <form id={identifier} onSubmit={SubmitRating.bind(this)}>
                    <select id={`selection${identifier}`}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="0">Remove Rating</option>
                    </select> 
                    <button type="Submit">Submit</button>
                    </form>
                    <p>Ratings:</p>
                    <p id={`ratings${identifier}`}>{result[0].ratings}</p>
                </div>
            )
        }
        else {return(
            <div>
            {movie}
            <p>Screening Worthy:</p>
            <p id={`average${identifier}`}>No Ratings Yet</p>
            <form id={identifier} onSubmit={newRating.bind(this)}>
            <select id={`selection${identifier}`}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="0">Remove Rating</option>
            </select> 
            <button type="Submit">Submit</button>
            </form>
            <p>Ratings:</p>
            <p id={`ratings${identifier}`}>No Ratings Yet</p>
        </div>
        )}
    })
    .then(result => {this.setState({
        components: result
    })})
}
}
