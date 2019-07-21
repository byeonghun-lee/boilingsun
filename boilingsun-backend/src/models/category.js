const mongoose = require("mongoose");

const { Schema } = mongoose;

const Category = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    isBasic: {
        type: Boolean,
        default: false
    },
    nextCategery: {
        type: String,
        default: null
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Category", Category);