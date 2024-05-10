const Router = require('express')
const router = new Router()
const movieController = require('../controllers/filmController')

router.post('/save-movie', movieController.saveMovieController)
router.get('/show-movie-byid', movieController.showMovieByMovieIdController)
router.get('/show-movie-byid1', movieController.showMovieByMovieIdController1)


module.exports = router