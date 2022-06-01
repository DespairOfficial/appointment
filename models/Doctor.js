const {
    TopologyDescriptionChangedEvent,
    CommandStartedEvent,
} = require('mongodb')
const { Schema } = require('mongoose')
const db = require('../db')
const doctorSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3,
        trim: true,
    },
    spec: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
    },
    slots: {
        type: [Date],
        required: false,
    },
})

doctorSchema.methods.deleteSlot = function (slot) {
    var date = new Date(slot)
    const newSlots = this.slots.filter(
        (item) => item.getTime() !== date.getTime()
    )
    this.slots = newSlots
    this.save()
}
module.exports = db.model('Doctor', doctorSchema)
