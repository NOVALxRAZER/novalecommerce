const mongoose = require("mongoose")

const GoogleUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
}, 
    {timestamps: true}
);

module.exports = mongoose.model("GoogleUser", GoogleUserSchema);