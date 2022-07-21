import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/movies');
        console.log(`mongodb connected ${conn}`);
    }catch(err){
        console.log(`MongoError: ${err}`);
    }
}

export default connectDB;