const Ticket = require('../models/Ticket')
const User = require('../models/User')
const Doctor = require('../models/Doctor')
const { createConnection } = require('mongoose')

class ticketsController {
    getTickets = async (req, res) => {
        try {
            const ticket = await Ticket.find({})
            res.send(ticket)
        } catch (err) {
            throw err
        }
    }
    createTicket = async (req, res) => {
        try {
            const doctorId = req.body.doctor
            const userId = req.body.user
            const slot = req.body.slot

            const doctor = await Doctor.findById(doctorId).exec()
            const user = await User.findById(userId).exec()

            if (Date.parse(slot)) {
                const doctorHavingSlot = await Doctor.find({
                    _id: doctor._id,
                    slots: slot,
                }).exec()

                if (doctorHavingSlot.length) {
                    await doctor.deleteSlot(slot)
                    const ticket = new Ticket({
                        doctor: doctor._id,
                        user: user._id,
                        slot: slot,
                    })
                    await ticket.save()
                    res.send({
                        doctor: {
                            name: doctor.name,
                            spec: doctor.spec,
                        },
                        user: { name: user.name, phone: user.phone },
                        message: `Успешно записан на ${slot}`,
                    })
                } else {
                    res.status(404).send('Nothing on this date')
                }
            } else {
                res.status(400).send({
                    message: 'Wrong date format',
                })
            }
        } catch (err) {
            console.log(err)
            res.status(400).send('Bad request')
        }
    }
}
module.exports = new ticketsController()
