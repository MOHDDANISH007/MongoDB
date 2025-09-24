import { Schema, model } from "mongoose";

// creating schema


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true
    },  
    weight: {
        type: Number,
    },
    createAt: {
        type: Date,
        default: Date.now.String
    }
})

// creating model(collection)
const User = model('User', userSchema);

// exporting model
export default User