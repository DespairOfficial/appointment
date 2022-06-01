const res = require('express/lib/response')
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Doctor = require('../models/Doctor')
const events = require('events')
const fs = require('fs')
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
            const emitter = new events.EventEmitter()
            emitter.once('sendReminder', (message) => {
                console.log(message)
                fs.appendFile(
                    __dirname + '/../data/logs.log',
                    message,
                    function (error) {
                        if (error) throw error
                        console.log('Асинхронная запись файла завершена.')
                    }
                )
            })

            const ticket = await Ticket.findOne({ user: userId }).exec()
            const visitTime = ticket.slot
            const user = await User.findById(ticket.user).exec()
            const doctor = await Doctor.findById(ticket.doctor).exec()

            const beforeTwoHours = new Date(visitTime).setHours(
                visitTime.getHours() - 2
            )
            const beforeDay = new Date(visitTime).setHours(
                visitTime.getHours() - 24
            )
            const sendMessageBeforeTwoHours = async (newNow, time) => {
                if (!ticket.isSendTwoHoursBefore) {
                    await ticket.setIsSendTwoHoursBefore(true)
                    emitter.emit(
                        'sendReminder',
                        `${new Date(newNow).toUTCString()} | Привет ${
                            user.name
                        }! Вам через 2 часа к  "${doctor.name} - ${
                            doctor.spec
                        }"в ${time}!\n`
                    )
                }
            }
            const sendMessageBeforeOneDay = async (newNow, time) => {
                if (!isSendDayBefore) {
                    await ticket.setIsSendDayBefore(true)
                    emitter.emit(
                        'sendReminder',
                        `${new Date(newNow).toUTCString()} | Привет ${
                            user.name
                        }! Напоминаем что вы записаны к "${doctor.name} - ${
                            doctor.spec
                        }" завтра в ${time}!\n`
                    )
                }
            }
            setInterval(() => {
                const now = new Date()
                const newNow = now.setHours(now.getHours() + 3)

                const fixedSeconds = new Date(newNow).setSeconds(0, 0)

                if (fixedSeconds == beforeTwoHours) {
                    const time = new Date(beforeTwoHours)
                        .toISOString()
                        .slice(11, 19)
                    sendMessageBeforeTwoHours(newNow, time)
                }
                if (fixedSeconds == beforeDay) {
                    const time = new Date(beforeDay).toISOString().slice(11, 19)
                    sendMessageBeforeOneDay(newNow, time)
                }
            }, 500)
        } catch (err) {
            console.log(err)
            res.status(400).send('Wrong data')
        }
    }
}
module.exports = new usersController()
