import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:String,
    password:String,
    email: {type:String , unique:true},
})
const userModel = mongoose.model('users',UserSchema)

const DistrictSchema = new Schema({
    districtName: String,
    state: String,
    info: String,
    images: [String],
});
const districtModel = mongoose.model("districts", DistrictSchema);

export { userModel, districtModel };