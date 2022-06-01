const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Doctor = require('../models/Doctor')
const notificationService = require('../notificationService/notificationService')

class usersController {
    getUsers = async (req, res) => {
        try {
            const users = await User.find({})
            res.send(users)
        } catch (err) {
            res.status(500)
            throw err
        }
    }
    createUser = async (req, res) => {
        try {
            const username = req.body.name
            const userPhone = req.body.phone
            const user = new User({
                name: username,
                phone: userPhone,
            })
            await user.save()
            res.send({ message: 'User created successfully', user })
        } catch (err) {
            res.status(500)
            throw err
        }
    }
    wait = async (req, res) => {
        const userId = req.params.userId

        try {
            res.writeHead(200, {
                Connection: 'keep-alive',
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
            })

            const ticket = await Ticket.findOne({ user: userId }).exec()
            const visitTime = ticket.slot
            const user = await User.findById(ticket.user).exec()
            const doctor = await Doctor.findById(ticket.doctor).exec()

            setInterval(() => {
                notificationService(user, doctor, ticket, visitTime)
            }, 500)
        } catch (err) {
            console.log(err)
            res.status(400).send('Wrong data')
        }
    }
}
module.exports = new usersController()
