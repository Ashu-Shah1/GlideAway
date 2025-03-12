import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:String,
    password:String,
    email: {type:String , unique:true},
})
const userModel = mongoose.model('users',UserSchema)

export default userModel