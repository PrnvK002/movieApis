import mongoose, { mongo } from "mongoose";

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    year : {
        type : Date,
        required : true
    },
    genres : {
        type : Array,
        required : true
    },
    ratings : {
        type : Number,
        required : true
    },
    director : {
        type : String,
        required : true
    },
    duration : {
        type : String
    },
    cast : {
        type : Array
    }
});

export default mongoose.model('movie',movieSchema);