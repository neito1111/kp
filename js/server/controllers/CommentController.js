const {Comments} = require('../models/models')
/*const uuid = require('uuid')
const path = require('path');*/

class CommentController{
	async saveCommentController(req, res, next) {
		console.log(1)
		const movieId = req.body.movieId;
		
		const email = req.body.email;
		
		const text = req.body.text;
		
		const rating = req.body.rating;
		
	  
		try {
		  const comment = await Comments.create({
			movieId: movieId,
			rating: rating,
			text: text,
			email: email
		  });

		  res.json(comment);
		} catch (error) {
		  next(error);
		}
	  }
	  async getCommentsByMovieId(req, res, next) {
		const movieId = req.params.id;
	
		try {
		  const comments = await Comments.findAll({ where: { movieId: movieId }});

		  res.json(comments);
		} catch (error) {
		  next(error);
		}
	  }
}
module.exports = new CommentController();