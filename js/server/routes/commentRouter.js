const Router = require('express')
const router = new Router()
const commentController = require('../controllers/CommentController')

router.post('/save-comment', commentController.saveCommentController)
//router.get('/show-comment', commentController.showCommentController)
router.get('/:id', commentController.getCommentsByMovieId.bind(commentController));
//router.get('/', deviceController.getAll)
//router.get('/:id', deviceController.getOne)

module.exports = router