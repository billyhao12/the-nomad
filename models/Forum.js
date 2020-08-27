const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    author:{
        type: String,
        required: true
    },   
    content :{
        type: String,
        required: true
    },
    like: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now 
    },


})

module.exports = Forum = mongoose.model("forum", ForumSchema)