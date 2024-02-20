import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema =new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    confirmPassword:{
        type: String
    },
    role:{
        type:String,
        default: "user"
    }
})

userSchema.pre("save", async function(next){
        if(!this.isModified("password")){next()}
        this.password = await bcrypt.hash(this.password,10)
        this.confirmPassword = undefined
        next()
})

userSchema.methods.comparePasswords = async function(password, dbPassword){
    return bcrypt.compare(password,dbPassword)
}
export const User = mongoose.model("User",userSchema)