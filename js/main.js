
const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
       </div>
        ${
          
          `
       
        `
        }
      </div>
        `;
        
    movieEl.addEventListener("click", () => showMovieByMovieId1(movie.filmId))
   
    moviesEl.appendChild(movieEl);
  });
}



async function showMovieByMovieId1(movieId){
console.log(movieId)
  try {
  const response = await axios.get(`http://localhost:5000/api/Film/show-movie-byid1`, { params: { movieId } })
  .then(response => {
    const user = response.data;
    console.log(user)
    if (user.length > 0 &&movieId===user[0].movieId){
      localStorage.setItem('movieId',movieId);
      window.location.href = 'film.html';
    }
    else{
      openModal(movieId);
    }
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

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});
/*

// Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  
  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
      <h2>
        <span class="modal__movie-title">${respData.nameRu}</span>
        <span class="modal__movie-release-year"> - ${respData.year}</span>
      </h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
        ${respData.filmLength ? `<li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>` : ''}
        <li >Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${respData.webUrl}</a></li>
        <li class="modal__movie-overview">Описание - ${respData.description}</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `
  const btnClose = document.querySelector(".modal__button-close");
  btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
})

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
})
getMovies1(API_URL_POPULAR);
async function getMovies1(url) {
const resp = await fetch(url, {
  headers: {
  "Content-Type": "application/json",
  "X-API-KEY": API_KEY,
  },
});
const respData = await resp.json();
showMovies(respData);
}
function showMovies1(data) {
const moviesEl = document.querySelector(".movies");

// Очищаем предыдущие фильмы
document.querySelector(".movies").innerHTML = "";

data.films.forEach((movie) => {
  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");
  movieEl.addEventListener("click", () => openModal1(movie.filmId))
  moviesEl.appendChild(movieEl);
});
}*/

async function openModal(id) {
  
const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
  headers: {
  "Content-Type": "application/json",
  "X-API-KEY": API_KEY,
  },
});
const respData = await resp.json();
let gen=respData.genres.map((el) => el.genre)
const movieId=id;
console.log(movieId)
  const movieName=respData.nameRu;
  console.log(movieName)
  const movieYear=respData.year;
  console.log(movieYear)
  const avarageRating='0'
  console.log(avarageRating)
  const moviePeople='0';
  console.log(moviePeople)
  const movieGenre = respData.genres.map(el => el.genre).join(', ');
  console.log(movieGenre)
  const movieTime=respData.filmLength
  console.log(movieTime)
  const movieDiscript=respData.description
  console.log(movieDiscript)
  const movieImg=respData.posterUrlPreview
  console.log(respData.posterUrlPreview);
  saveMovie(movieId,movieName,movieYear,avarageRating,moviePeople,movieGenre,movieTime,movieDiscript,movieImg);

}
async function saveMovie(movieId,movieName,movieYear,avarageRating,moviePeople,movieGenre,movieTime,movieDiscript,movieImg) {
try {
  localStorage.setItem('movieId',movieId);
  const response = await axios.post('http://localhost:5000/api/Film/save-movie', {
      movieId:movieId,
    movieName:movieName,
    movieYear:movieYear,
    avarageRating:avarageRating,
    moviePeople:moviePeople,
    movieGenre:movieGenre,
    movieTime:movieTime,
    movieDiscript:movieDiscript,
    movieImg:movieImg
  });
  document.getElementById("movie").onclick=window.location.href = 'film.html';
  return response.data;
} catch (error) {
  throw new Error('Failed to save comment: ' + error.message);
}
}