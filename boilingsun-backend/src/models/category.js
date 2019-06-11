const mongoose = require("mongoose");

const { Schema } = mongoose;

const Category = new Schema({
    name: String,
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