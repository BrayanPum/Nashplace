import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    identificacion:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    correoElectronico:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    telefono:{
        type: String,
        required: true,
        trim: true,
    },
    username:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    }
},{timestamps:true})

export default mongoose.model('Cliente', userSchema)