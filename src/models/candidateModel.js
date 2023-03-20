const mongoose = require("mongoose")

const candidateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("candidate", candidateSchema)