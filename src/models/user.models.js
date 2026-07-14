import mongoose, { Mongoose,Schema } from "mongoose";

const UserSchema=new Schema({
    full_name:{
        type:String,
        required:[true,"Name Is Required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    verification_token:{
        type:String,
        
    },
    isVerified: {
    type: Boolean,
    default: false
},

},
{
    timestamps:true
}
);

    export const User = mongoose.model("User",UserSchema);
