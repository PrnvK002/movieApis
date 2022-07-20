import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/movies');
        console.log(`mongodb connected ${conn}`);
    }catch(err){
        console.log(`Mongodb connected : ${err}`);
    }
}

export default connectDB;