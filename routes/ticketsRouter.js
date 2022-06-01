const { Router } = require('express')
const router = Router()
const controller = require('../controllers/ticketsController')

router.get('/', controller.getTickets)
router.post('/create', controller.createTicket)
module.exports = router
