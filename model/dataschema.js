const bcrypt = require('bcrypt')
const mongoos = require('mongoose')

const dataSchema = mongoos.Schema({
    name: {
        type: String,
        //required: true,
        //enm: ["Ahmed", "mohamed"],
    },
    ph: {
        type: String,
        required: true,
        unique: true,
    },
    grade: {
        type: String,
        //  required: true,
    },
    password: {
        type: String,
        required: true,
        // unique: true,
    },
    // online: {
    //     type: String,
    //     required: true,

    // },

})


dataSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const dataModel = mongoos.model('data', dataSchema)

module.exports = dataModel