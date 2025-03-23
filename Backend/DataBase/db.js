import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:String,
    password:String,
    email: {type:String , unique:true},
})

const DistrictSchema = new Schema({
    districtName: String,
    state: String,
    info: String,
    images: [String],
    keyAttractions: [{ type: String }],
    localCulture: { type: String },

});

const districtModel = mongoose.model("districts", DistrictSchema);
const userModel = mongoose.model('users',UserSchema)

export {userModel,districtModel}