import mongoose from "mongoose";


const  dbConnection=async ()=>{ 
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected")
}
catch(error){
    console.error("Database Connection Error",error)
};
}
export {dbConnection}