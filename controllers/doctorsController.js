const Doctor = require('../models/Doctor')
class doctorsController {
    getDoctors = async (req, res) => {
        try {
            const doctors = await Doctor.find({})
            res.send(doctors)
        } catch (err) {
            throw err
        }
    }
    createDoctor = async (req, res) => {
        try {
            const doctorName = req.body.name
            const doctorSpec = req.body.spec
            const doctorSlots = req.body.slots
            const doctor = new Doctor({
                name: doctorName,
                spec: doctorSpec,
                slots: doctorSlots,
            })
            await doctor.save()
            res.send({ message: 'Doctor created successfully', doctor })
        } catch (err) {
            res.status(500)
            throw err
        }
    }
}
module.exports = new doctorsController()
