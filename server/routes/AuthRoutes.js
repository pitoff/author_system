const {Router} = require('express')
const auth = require('../controllers/AuthController')
const router = Router()

router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.get('/logout', auth.logout)
router.get('/verifyuser', auth.verifyUser)

module.exports = router;