const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/me', userController.me)
router.post('/logout', userController.logout)
router.put('/change-password', userController.changePassword)
router.put('/uploadAvatarIMG',userController.uploadAvatarIMG)
router.get('/getInfoUser',userController.getInfoUser)
router.delete('/deleteUser',userController.deleteUser)
router.post('/userInfoById',userController.userInfoById)

module.exports = router
