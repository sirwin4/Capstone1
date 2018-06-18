import React from 'react'
import ReactDOM from 'react-dom'

export const SubmitRating = function (event) {
    event.preventDefault()
    let user = sessionStorage.getItem("login")
    console.log(user)
    let currentId = event.target.id
    fetch(`http://localhost:5342/moviesUsers?userId=${user}&movieId=${currentId}`)
    .then(result => result.json())
    .then(result => {
        if (result[0] === undefined) {
    let ratings = document.getElementById(`ratings${currentId}`).textContent
    let average = document.getElementById(`average${currentId}`).textContent
    let voted = document.getElementById(`selection${currentId}`)
    let vote = voted.options[voted.selectedIndex].value
    average = ((average * ratings) + vote)/ (ratings + 1)
    ratings = parseInt(ratings) + 1
    fetch(`http://localhost:5342/movies/${currentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: currentId, average: average, ratings: ratings })
    })
    fetch(`http://localhost:5342/moviesUsers`, {
        method: "POST",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        movieId: currentId,
        userId: parseInt(user)
        
        })
      })  
    .then(response => {document.getElementById(`ratings${currentId}`).textContent = ratings})
    .then(response => {document.getElementById(`average${currentId}`).textContent = average})
    }
    else {
        
    }
})}
