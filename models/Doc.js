const {Schema, model} = require('mongoose')

const docSchema = new Schema({
    title: {
        type: String
    },
    doctype: {
        type: String
    },
    link: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Doc', docSchema)