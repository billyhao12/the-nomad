const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author:{
        type: String,
        required: true
    },   
    content :{
        type: String,
        required: true
    },
    like: {
        type: Integer
    },
    date: {
        type: Date,
        default: Date.now 
    }
})

module.exports = Forum = mongoose.model("comment", CommentSchema)