const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "service",
                required: true,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("cart", CartSchema);
