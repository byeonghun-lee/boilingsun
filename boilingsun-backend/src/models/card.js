import mongoose from "mongoose";

const { Schema } = mongoose;

const Card = new Schema({
    title: String,
    url: {
        type: String,
        required: true
    },
    body: String,
    isRead: {
        type: Boolean,
        default: false
    },
    readDate: {
        type: Date
    },
    categoryId: Number,
    createdDate: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model("Card", Card);
