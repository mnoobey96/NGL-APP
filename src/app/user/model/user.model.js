// schema

import {model,mongoose} from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: function () {
            return this.provider === 'local';

        }
    },
    provider: {
        type: String,
        enum: ['google', 'facebook', 'local'],
        default: 'local'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    dob: Date
    ,
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
},{timestamps:{
    createdAt:true,
        updatedAt:true
    }
});

//model

export const User = model('User', userSchema);