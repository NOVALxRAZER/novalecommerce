const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    products: [
        {
            email: {
                type: String,
                required: true,
            },
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
            },
        }
    ]
},
    {timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema);