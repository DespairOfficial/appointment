const { Schema } = require('mongoose')
const db = require('../db')
const ticketsSchema = new db.Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    slot: {
        type: Date,
        required: true,
    },
    isSendTwoHoursBefore: {
        type: Boolean,
        required: true,
        default: false,
    },
    isSendDayBefore: {
        type: Boolean,
        required: true,
        default: false,
    },
})

ticketsSchema.methods.setIsSendTwoHoursBefore = function (
    isSendTwoHoursBefore
) {
    this.isSendTwoHoursBefore = isSendTwoHoursBefore
    this.save()
}
ticketsSchema.methods.setIsSendDayBefore = function (isSendDayBefore) {
    this.isSendDayBefore = isSendDayBefore
    this.save()
}

module.exports = db.model('Ticket', ticketsSchema)
