const {Schema, model, Types} = require ('mongoose')

const bidSchema = new Schema({
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
    cabinetnumber: {
        type: String
    },
    creator: {
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
        type: Types.ObjectId,
        ref: 'User'
    },
    completemessage: {
        type: String
    }
})

module.exports = model('Bid', bidSchema)