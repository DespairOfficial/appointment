const { Router } = require('express')
const router = Router()
const controller = require('../controllers/usersController')

router.get('/', controller.getUsers)
router.post('/create', controller.createUser)
router.get('/:userId/wait', controller.wait)
module.exports = router
