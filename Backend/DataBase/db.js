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

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: String,
    authorName: { type: String, required: true },
    authorAvatar: { type: String, required: true },
    likes: [{ type: String }],
    comments: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
  
  
const blogModel = mongoose.model("blogs", blogSchema);
const districtModel = mongoose.model("districts", DistrictSchema);
const userModel = mongoose.model('users',UserSchema)

export {userModel,districtModel,blogModel}