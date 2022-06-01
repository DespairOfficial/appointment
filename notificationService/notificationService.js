const fs = require('fs')
const events = require('events')
function service(user, doctor, ticket, visitTime) {
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
    const beforeTwoHours = new Date(visitTime).setHours(
        visitTime.getHours() - 2
    )
    const beforeDay = new Date(visitTime).setHours(visitTime.getHours() - 24)
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
        if (!ticket.isSendDayBefore) {
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
    const now = new Date()
    const newNow = now.setHours(now.getHours() + 3)
    const fixedSeconds = new Date(newNow).setSeconds(0, 0)

    if (fixedSeconds == beforeTwoHours) {
        const time = new Date(beforeTwoHours).toISOString().slice(11, 19)
        sendMessageBeforeTwoHours(newNow, time)
    }
    if (fixedSeconds == beforeDay) {
        const time = new Date(beforeDay).toISOString().slice(11, 19)
        sendMessageBeforeOneDay(newNow, time)
    }
}
module.exports = service
