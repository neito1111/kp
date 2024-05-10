const {Film} = require('../models/models')
const {Comments} = require('../models/models')


class MovieController{
	async saveMovieController(req,res,next){
		const {
			movieId,
			movieName,
			movieYear,
			avarageRating,
			moviePeople,
			movieGenre,
			movieTime,
			movieDiscript,
			movieImg
		  } = req.body;

		try {
			console.log(10)
			const movie = await Film.create({
				movieId: movieId,
				movieName: movieName,
				movieYear: movieYear,
				avarageRating: avarageRating,
				moviePeople: moviePeople,
				movieGenre: movieGenre,
				movieTime: movieTime,
				movieDiscript: movieDiscript,
				movieImg: movieImg
			  });
			  
			console.log(11)
			res.json(movie);
			console.log(12)
		  } catch (error) {
			console.log(13)
			next(error);
		  }
	}
	async showMovieByMovieIdController(req,res,next){
		const { movieId } = req.query;
		console.log(movieId)
		try {
		// Проверка, что movieId передан и является числом
		if (!movieId || isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid movie ID' });
		}
		const movies = await Film.findAll({ where: { movieId }, include: Comments });
		console.log(movies[0].Comments)
		
		res.json(movies);
		} catch (error) {
		next(error);
		}
	}
	async showMovieByMovieIdController1(req,res,next){
		const { movieId } = req.query;
		console.log(movieId)
		try {
		// Проверка, что movieId передан и является числом
		if (!movieId || isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid movie ID' });
		}
		const movies = await Film.findAll({ where: { movieId } });
		console.log(55)
		
		res.json(movies);
		} catch (error) {
		next(error);
		}
	}
}
module.exports = new MovieController()
