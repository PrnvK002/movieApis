import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}
);

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model('users', userSchema);