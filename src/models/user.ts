import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    password: {
        type: String,
        trim: true,
        require: true
    }
})

export const User = mongoose.model('User', userSchema)
