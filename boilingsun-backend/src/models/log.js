import mongoose from "mongoose";

const { Schema } = mongoose;

const LogSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    cardId: {
        type: String,
        required: true
    },
    action: {
        type: String,
        enum: ["READ", "WRITE", "UPDATE"]
    },
    description: String
});

const Log = mongoose.model("Log", LogSchema);
export default Log;
