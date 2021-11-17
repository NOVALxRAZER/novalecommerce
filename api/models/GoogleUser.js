const mongoose = require("mongoose")

const GoogleUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        require: true
    },
    displayName: {
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
}, 
    {timestamps: true}
);

module.exports = mongoose.model("GoogleUser", GoogleUserSchema);