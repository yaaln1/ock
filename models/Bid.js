const {Schema, model, Types} = require ('mongoose')

const bidSchema = new Schema({
    manualid: {
        type: String,
        default: '-'
    },
    title: {
        type: String,
        required: true
    },
    createmessage: {
        type: String
    },
    createtime: {
        type: Date,
        default: Date.now
    },
    department: {
        type: String,
        required: true
    },
    creator: {
        type: String
    },
    creatorId: {
        type: String
    },
    status: {
        type: String,
        default: 'new'
    },
    completetime: {
        type: Date
    },
    executor: {
        type: String,
        default: '-'
    },
    completemessage: {
        type: String
    },
    fullcompletetime: {
        type: Date
    }
})

module.exports = model('Bid', bidSchema)