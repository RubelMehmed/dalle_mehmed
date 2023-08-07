import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: { type: String, requires: true },
    prompt: { type: String, requires: true },
    photo: { type: String, requires: true },

});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;