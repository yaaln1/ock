const {Schema, model} = require('mongoose')
const Message = require('./Message')


const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    fio: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    department: {
        type: String
    },
    appointment: {
        type: String
    },
    message: [ {
        status: Boolean,
        title: String,
        detail: String,
        link: String
    } ],
    mark: [ {
        date: String,
        status: String,
        detail: String
    } ],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = model('User', userSchema)