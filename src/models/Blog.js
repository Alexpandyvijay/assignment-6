const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    id : Schema.Types.ObjectId, 
    topic  : String, 
    description : String, 
    posted_at : Date, 
    posted_by : String
})

const Blog = mongoose.model('blogs', blogSchema);

module.exports = Blog;