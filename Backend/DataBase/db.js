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
const BlogSchema = new Schema({
    title: String,
    content: String,
    category: String,
    imageUrl: String,
    authorName: String,
    authorAvatar: String,
    likes: Number,
    comments: Number,
    createdAt: { type: Date, default: Date.now }
  });
  
const blogModel = mongoose.model("blogs", BlogSchema);

const districtModel = mongoose.model("districts", DistrictSchema);
const userModel = mongoose.model('users',UserSchema)

export {userModel,districtModel,blogModel}