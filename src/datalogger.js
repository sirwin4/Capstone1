export const SubmitRating = function (event) {
    event.preventDefault()
    let user = this.props.activeUser
    user = parseInt(user)
    let currentId = event.target.id
    let voted = document.getElementById(`selection${currentId}`)
    let vote = voted.options[voted.selectedIndex].value
    vote = parseInt(vote)
    fetch(`http://localhost:5342/moviesUsers?userId=${user}&movieId=${currentId}`)
    .then(result => result.json())
    .then(result => {
        console.log(result)
        
        if (result[0] === undefined) {
            let ratings = parseInt(document.getElementById(`ratings${currentId}`).textContent)
            let average = document.getElementById(`average${currentId}`).textContent
    average = parseInt(average)
    average = ((average * ratings) + vote)/ (ratings + 1)
    ratings = parseInt(ratings) + 1
    fetch(`http://localhost:5342/movies/${currentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: currentId, average: average, ratings: ratings })
    })
    .then(result => {
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
        })
      })})  
    .then(response => {document.getElementById(`ratings${currentId}`).textContent = ratings})
    .then(response => {document.getElementById(`average${currentId}`).textContent = average})
    .then(response => {document.getElementById(`${currentId}`).reset()})
    }
    else {
        let ratings = document.getElementById(`ratings${currentId}`).textContent
        let average = document.getElementById(`average${currentId}`).textContent
        average = parseInt(average)
        average = (((average * ratings) - result[0].rating) + vote)/ratings
        fetch(`http://localhost:5342/moviesUsers/${result[0].id}`, {
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
            body: JSON.stringify({ movieId: currentId, average: average, ratings: ratings})
        })
        .then(response => {document.getElementById(`average${currentId}`).textContent = average})
        .then(response => {document.getElementById(`${currentId}`).reset()})
    }
})}
