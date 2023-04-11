const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const User = new Schema({
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    maritalStatus: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    residence: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        default: ""
    },
    diferentlyAbled: {
        type: String,
        default: ""
    },
    minority: {
        type: String,
        default: ""
    },
    student: {
        type: String,
        default: "",
    },
    bpl: {
        type: String,
        default: "",
    },
    familyIncome: {
        type: Number,
        default: "",
    },
    parentIncome: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: [Session],
    },

}
)

//Remove refreshToken from the response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)
