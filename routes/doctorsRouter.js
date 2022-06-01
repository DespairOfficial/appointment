const { Router } = require('express')
const router = Router()
const controller = require('../controllers/doctorsController')

router.get('/', controller.getDoctors)
router.post('/create', controller.createDoctor)
router.post('/slot/create', controller.createSlot)
module.exports = router
