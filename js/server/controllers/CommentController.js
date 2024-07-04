const {Comments} = require('../models/models')
/*const uuid = require('uuid')
const path = require('path');*/
const axios = require('axios');

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
	  async getRatingByMovieId(req, res, next) {
		const rating = req.body;
		console.log(rating);
		try {
			const response = await axios.post(`http://localhost:8080/grades`, rating);
			const averageRating = response.data;
			console.log(averageRating);
		  res.json(averageRating);
		} catch (error) {
		  next(error);
		}
	  }


	  async deleteCommentsById(req,res,next){
		const {id}=req.body;
		console.log(id);
		try{

			const comment=await Comments.findOne({where:{id}});
			if (!comment) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            await comment.destroy();
			res.status(200).json({ message: 'Пользователь успешно удален' });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
	  }
}
module.exports = new CommentController();