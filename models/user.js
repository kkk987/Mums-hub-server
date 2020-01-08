const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 18
    },
	email: {
		type: String,
		required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 18
    },
    duedate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", User)