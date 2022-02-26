const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Task = new Schema({
    name: {
        type: String,
    },
    percent: {
        type: Number,
        min: 0,
        max: 100
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
    user: {
        type: String, required: true
    }
})