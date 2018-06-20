

export const newRating = function (event) {
    event.preventDefault()
    let currentId = event.target.id
    let user = this.props.activeUser
    user = parseInt(user)
    let voted = document.getElementById(`selection${currentId}`)
    let vote = parseInt(voted.options[voted.selectedIndex].value)
    fetch(`http://localhost:5342/movies?id=${currentId}`)
    .then(result => result.json())
    .then(result =>{

    if (result[0] === undefined && vote !== 0) {
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
      fetch(`http://localhost:5342/moviesUsers`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            movieId: currentId,
            userId: parseInt(user),
            rating: vote
        })})
      .then(response => {document.getElementById(`ratings${currentId}`).textContent = ratings})
      .then(response => {document.getElementById(`average${currentId}`).textContent = vote})
      .then(response => {document.getElementById(`${currentId}`).reset()})
        }
        else if (vote === 0) {
            let ratings = document.getElementById(`ratings${currentId}`).textContent = ratings
            if (ratings === 0) {
                window.alert("No Rating Yet")
            }
            else{
                fetch(`http://localhost:5342/moviesUsers/${currentId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })  
                fetch(`http://localhost:5342/movies/${currentId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }
        }
        else {
            let ratings = document.getElementById(`ratings${currentId}`).textContent
            ratings = parseInt(ratings)
            
            fetch(`http://localhost:5342/moviesUsers/${currentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ movieId: currentId, userId: user, rating: vote })
            })  
            fetch(`http://localhost:5342/movies/${currentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: currentId, average: vote, ratings: ratings})
            })
            
            .then(response => {document.getElementById(`average${currentId}`).textContent = vote})
            .then(response => {document.getElementById(`${currentId}`).reset()})
        }
    })
}