import React from 'react'
import {SubmitRating} from './datalogger.js'

export const newRating = function (event) {
    event.preventDefault()
    let currentId = event.target.id
    let check =""
    fetch(`http://localhost:5342/movies?id=${currentId}`)
    .then(result => { check = result})
    if (check === "") {
    let voted = document.getElementById(`selection${currentId}`)
    let vote = parseInt(voted.options[voted.selectedIndex].value)
    let ratings = 1
    fetch('http://localhost:5342/movies', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: currentId,
          average: vote,
          ratings: ratings
        })
      })
      .then(response => {document.getElementById(`ratings${currentId}`).textContent = ratings})
      .then(response => {document.getElementById(`average${currentId}`).textContent = vote})
        }
    
}