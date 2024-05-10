const movieId=localStorage.getItem('movieId');
const nameMovie=document.getElementById('nameMovie')
const yearMovie=document.getElementById('yearMovie')
const avarageRatingMovie=document.getElementById('averageRatingMovie')
const peopleMovie=document.getElementById('peopleMovie')
const genreMovie=document.getElementById('genreMovie')
const timeMovie=document.getElementById('timeMovie')
const discriptMovie=document.getElementById('discriptMovie')
const imgMovie=document.getElementById('poster')
let comments;
async function showMovieByMovieId(){
    try {
        console.log(movieId);
		const response = await axios.get(`http://localhost:5000/api/Film/show-movie-byid`, { params: { movieId } })
		.then(response => {
			const movie = response.data;
			console.log(movie)
    nameMovie.textContent = movie[0].movieName;
    imgMovie.src = movie[0].movieImg;
    yearMovie.textContent = movie[0].movieYear;
    avarageRatingMovie.textContent = movie[0].avarageRating;
    genreMovie.textContent = movie[0].movieGenre;
    timeMovie.textContent = movie[0].movieTime;
    discriptMovie.textContent = movie[0].movieDiscript;
    comments = movie[0].Comments;
	console.log()
    showComments(comments);

		})
		.catch(error => {
			console.error(error);
		});
		console.log(8)
      //  return response.data;
    } catch (error) {
        throw new Error('Failed to get comments: ' + error.message);
    }
}
showMovieByMovieId();
 document.getElementById("commAdd-btn").onclick=async function(){
	event.preventDefault()
	
	let text =document.getElementById('comment1').value;
	 let email=localStorage.getItem('email');
	let movieId=localStorage.getItem('movieId')
	const ratingInputs = document.querySelectorAll('input[name="rating"]');
     let Rating;
    ratingInputs.forEach(input => {
    if (input.checked) {
    Rating = input.value;
  }
});
	console.log(Rating);
	console.log(text);
	console.log(email);
	console.log(movieId);
	saveComment(movieId,email,text,Rating);
  }
  async function saveComment(movieId, email, text,Rating) {
	try {
	  const response = await axios.post('http://localhost:5000/api/Comment/save-comment', {
		movieId: movieId,
		rating:Rating,
		text: text,
		email: email
	  });
	  return response.data;
	} catch (error) {
	  throw new Error('Failed to save comment: ' + error.message);
	}
}
function showComments(data){
	console.log(data)
    const commentsEl = document.querySelector(".comments");
    commentsEl.innerHTML = "";
    data.forEach(comment => {
        const commentEl = document.createElement("div");
        commentEl.classList.add("comment");
        commentEl.innerHTML = `
           
            <ul class="comment-list">
                <li>
                    <span class="username" id="userName">Имя пользователя: ${comment.email}</span>
                    <p>Оценка пользователя: ${comment.rating}</p>
                    <p id="comment">Текст комментария: ${comment.text}</p>
                    <button class="close-btn"></button>
                </li>
            </ul>
            <form>
        `;
        commentsEl.appendChild(commentEl);
    });
}
  