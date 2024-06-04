import mongoose from "mongoose";

const uri = "mongodb+srv://prueba:prueba123@nashplace.udawrau.mongodb.net/?retryWrites=true&w=majority&appName=NashPlace";

export const connectDB = async () => {
    try{
        await mongoose.connect(uri);
        console.log(">>>>>>Db is Connected")
    }catch (error){
        console.log(error);
    }
    
};
