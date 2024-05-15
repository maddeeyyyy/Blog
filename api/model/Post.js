const mongoose = require("mongoose");
const { Schema, model} = mongoose;


const PostSchema = new Schema({
    title : {type: String, require: true, unique: true}, 
    content : {type: String, require: true},
    image : {type: String,  require:true },
    author : {type:String, require:true},
})

const PostModel = model("Post", PostSchema);
module.exports = PostModel;
