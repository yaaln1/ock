const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    title: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    detail: {
        type: String
    },
    link: {
        type: String
    }
})

module.exports = model('Message', messageSchema)