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
      .then(async response => {
        const movie = response.data;
        console.log(movie)
        comments = movie[0].Comments;
      nameMovie.textContent = movie[0].movieName;
      imgMovie.src = movie[0].movieImg;
      yearMovie.textContent = movie[0].movieYear;
      console.log(1);
      genreMovie.textContent = movie[0].movieGenre;
      timeMovie.textContent = movie[0].movieTime;
      discriptMovie.textContent = movie[0].movieDiscript;
    console.log(comments)
    const averageRating = await showMovieRating(comments);
    avarageRatingMovie.textContent =  averageRating;

    
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
      console.log(comment.id);
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
        const deleteBtn = commentEl.querySelector('.close-btn');

        deleteBtn.addEventListener('click', () => {
            deleteComment(comment.id);
        });

        commentsEl.appendChild(commentEl);
    });
}
function deleteComment(id) {
  axios.delete(`http://localhost:5000/api/Comment/deleteComment`, {
    data: { id }
  })
  .then(function (response) {
    console.log(`Deleted account with ID: ${id}`);
  })
  .catch(function (error) {
    console.error('Error deleting account:', error);
  });
  console.log('Удаление комментария с ID:', id);
  // Удаляем элемент комментария из DOM
  window.location.reload();
}
 async function showMovieRating(data) {
  const num = [];
  data.forEach(comments => {
    console.log(comments.rating);
    num.push(comments.rating);
  });
  console.log(num);

  try {
    if (num.length === 0) {
      console.log('Массив рейтингов пустой!');
      return 0; // или возвращайте какое-то значение по умолчанию
    }
    let average = await sendMovieRatings(num);
    console.log(average);
    return average;
  } catch (error) {
    console.error('Ошибка в showMovieRating:', error);
    throw error; // пробрасываем ошибку дальше
  }
}
async function sendMovieRatings(ratings) {
  try {
    if (ratings.length === 0) {
      console.log('Массив рейтингов пустой!');
      return 0; // или возвращайте какое-то значение по умолчанию
    }
    const response = await axios.post(`http://localhost:5000/api/Comment/rating`, ratings);
    const averageRating = response.data;
    console.log(averageRating);
    return averageRating;
  } catch (error) {
    console.error('Ошибка в sendMovieRatings:', error);
    throw error; // пробрасываем ошибку дальше
  }
}
