require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const User = new Schema({
    userId: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
});

User.methods.generateAuthToken = async function() {
    const user = this;
    const token = await jwt.sign(
        { userId: user.userId },
        process.env.STRING_FOR_TOKEN_ISSUANCE
    );

    return token;
}

User.statics.findByCredentials = async function(userId, password) {
    const user = await this.findOne({ userId });

    if(!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
}

User.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
       user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

module.exports = mongoose.model("User", User);