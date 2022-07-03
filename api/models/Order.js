const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    title: {
        type: String
    },
    time: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema);