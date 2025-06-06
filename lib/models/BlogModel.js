import mongoose from "mongoose";

// 2 make schema for the data to be stored in db

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true        
    },
    description:{
        type: String,
        required: true        
    },
    category:{
        type: String,
        required: true        
    },
    author:{
        type: String,
        required: true        
    },
    image:{
        type: String,
        required: true        
    },
    authorImg:{
        type: String,
        required: true        
    },
    date:{
        type: Date,
        default: Date.now()
    }
})


//3 make model using schema

const BlogModel =  mongoose.model.nextblog || mongoose.model('nextblog', Schema);

export default BlogModel;